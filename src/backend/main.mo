import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Blob "mo:core/Blob";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Storage Mixin (for blob/file management)
  include MixinStorage();

  // Core Types
  public type DressId = Text;
  public type GroupId = Text;
  public type UserId = Principal;
  public type SlotNumber = Nat;
  public type City = Text;

  public type Size = {
    #XS;
    #S;
    #M;
    #L;
    #XL;
  };

  public type Occasion = {
    #wedding;
    #party;
    #formal;
    #casual;
  };

  module Occasion {
    public func toText(occasion : Occasion) : Text {
      switch (occasion) {
        case (#wedding) { "wedding" };
        case (#party) { "party" };
        case (#formal) { "formal" };
        case (#casual) { "casual" };
      };
    };
  };

  public type DressStatus = {
    #forming;
    #active;
    #cleaning;
    #resale;
    #complete;
  };

  public type GroupMember = {
    userId : UserId;
    slotNumber : SlotNumber;
    slotFee : Nat;
    depositPaid : Bool;
    shareAmount : Nat;
    isConfirmed : Bool;
    paymentStatus : Text;
  };

  public type RotationSchedule = {
    userId : UserId;
    startDate : Time.Time;
    endDate : Time.Time;
    status : Text;
  };

  public type Dress = {
    id : DressId;
    initiatorId : UserId;
    photos : [Storage.ExternalBlob];
    productLink : ?Text;
    brand : Text;
    color : Text;
    size : Size;
    occasion : Occasion;
    originalPrice : Nat;
    authenticityProof : Storage.ExternalBlob;
    groupSize : Nat;
    status : DressStatus;
    slotsFilled : Nat;
    rotationCity : City;
    priorityFees : [Nat];
  };

  public type Group = {
    id : GroupId;
    dressId : DressId;
    members : [GroupMember];
    rotationSchedule : [RotationSchedule];
    currentHolder : ?UserId;
    chatRoomId : Text;
    currentStatus : Text;
    conditionPhotos : [Storage.ExternalBlob];
    handOverPhotos : [Storage.ExternalBlob];
  };

  public type UserProfile = {
    principal : Principal;
    name : Text;
    city : City;
    profilePhoto : ?Storage.ExternalBlob;
    measurements : {
      bust : Nat;
      waist : Nat;
      hip : Nat;
    };
    trustScore : Float;
    depositBalance : Nat;
    earnings : Nat;
  };

  public type Handover = {
    groupId : GroupId;
    fromUserId : UserId;
    toUserId : UserId;
    timestamp : Time.Time;
    photo : Storage.ExternalBlob;
  };

  public type Rating = {
    raterId : UserId;
    rateeId : UserId;
    groupId : GroupId;
    score : Float;
    comment : Text;
    category : Text;
  };

  public type FindDressParams = {
    searchTerm : Text;
    occasion : Text;
    city : Text;
    priceRange : Text;
    size : Text;
  };

  public type GroupRequest = {
    dressId : DressId;
    fromUserId : UserId;
    requestedSlot : Nat;
    reason : Text;
    requestedOn : Time.Time;
  };

  public type GroupResponse = {
    approvedBy : UserId;
    requestId : Text;
    slotNumber : Nat;
    responseComments : Text;
    respondedOn : Time.Time;
    responseStatus : Text;
  };

  module Group {
    public func compare(g1 : Group, g2 : Group) : Order.Order {
      Text.compare(g1.id, g2.id);
    };
  };

  // Persistent Storage
  let dresses = Map.empty<DressId, Dress>();
  let users = Map.empty<UserId, UserProfile>();
  let groups = Map.empty<GroupId, Group>();
  let handovers = Map.empty<Text, Handover>();
  let groupRequests = Map.empty<Text, GroupRequest>();
  let groupResponses = Map.empty<Text, GroupResponse>();
  let ratings = Map.empty<Text, Rating>();

  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Helper Functions
  func getDressOrTrap(id : DressId) : Dress {
    switch (dresses.get(id)) {
      case (null) { Runtime.trap("Dress not found") };
      case (?dress) { dress };
    };
  };

  func getUserOrTrap(id : UserId) : UserProfile {
    switch (users.get(id)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) { user };
    };
  };

  func getGroupOrTrap(id : GroupId) : Group {
    switch (groups.get(id)) {
      case (null) { Runtime.trap("Group not found") };
      case (?group) { group };
    };
  };

  func isGroupMember(caller : Principal, groupId : GroupId) : Bool {
    switch (groups.get(groupId)) {
      case (null) { false };
      case (?group) {
        group.members.find(
          func(member) { Principal.equal(member.userId, caller) }
        ) != null;
      };
    };
  };

  func isCurrentHolder(caller : Principal, groupId : GroupId) : Bool {
    switch (groups.get(groupId)) {
      case (null) { false };
      case (?group) {
        switch (group.currentHolder) {
          case (null) { false };
          case (?holder) { Principal.equal(holder, caller) };
        };
      };
    };
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    users.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    users.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    users.add(caller, profile);
  };

  // Dress Functions
  public query ({ caller }) func getDress(id : DressId) : async Dress {
    getDressOrTrap(id);
  };

  public query ({ caller }) func getAllDresses() : async [Dress] {
    dresses.values().toArray();
  };

  public query ({ caller }) func searchDresses(params : FindDressParams) : async [Dress] {
    dresses.filter(
      func(_id, dress) {
        Occasion.toText(dress.occasion) == params.occasion;
      }
    ).values().toArray();
  };

  public shared ({ caller }) func postDressPhotos(photos : [Storage.ExternalBlob], _photoType : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload dress photos");
    };
    "New dress photo uploaded";
  };

  // Group Functions
  public query ({ caller }) func getFullGroupDetails(groupId : GroupId) : async Group {
    if (not isGroupMember(caller, groupId) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only group members can view group details");
    };
    getGroupOrTrap(groupId);
  };

  public shared ({ caller }) func createGroupWithDress(request : Group) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create groups");
    };
    groups.add(request.id, request);
    "Group created successfully";
  };

  // Stripe Integration
  public query ({ caller }) func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfig := ?config;
  };

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };
};
