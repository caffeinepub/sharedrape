import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface RotationSchedule {
    status: string;
    endDate: Time;
    userId: UserId;
    startDate: Time;
}
export interface Dress {
    id: DressId;
    status: DressStatus;
    rotationCity: City;
    originalPrice: bigint;
    priorityFees: Array<bigint>;
    color: string;
    size: Size;
    productLink?: string;
    occasion: Occasion;
    brand: string;
    slotsFilled: bigint;
    initiatorId: UserId;
    groupSize: bigint;
    authenticityProof: ExternalBlob;
    photos: Array<ExternalBlob>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface GroupMember {
    slotFee: bigint;
    paymentStatus: string;
    userId: UserId;
    isConfirmed: boolean;
    shareAmount: bigint;
    slotNumber: SlotNumber;
    depositPaid: boolean;
}
export interface Group {
    id: GroupId;
    conditionPhotos: Array<ExternalBlob>;
    members: Array<GroupMember>;
    rotationSchedule: Array<RotationSchedule>;
    dressId: DressId;
    chatRoomId: string;
    currentHolder?: UserId;
    currentStatus: string;
    handOverPhotos: Array<ExternalBlob>;
}
export type DressId = string;
export type City = string;
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type GroupId = string;
export type UserId = Principal;
export type SlotNumber = bigint;
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface FindDressParams {
    city: string;
    size: string;
    priceRange: string;
    searchTerm: string;
    occasion: string;
}
export interface UserProfile {
    principal: Principal;
    city: City;
    name: string;
    profilePhoto?: ExternalBlob;
    trustScore: number;
    earnings: bigint;
    measurements: {
        hip: bigint;
        bust: bigint;
        waist: bigint;
    };
    depositBalance: bigint;
}
export enum DressStatus {
    resale = "resale",
    active = "active",
    cleaning = "cleaning",
    complete = "complete",
    forming = "forming"
}
export enum Occasion {
    wedding = "wedding",
    casual = "casual",
    party = "party",
    formal = "formal"
}
export enum Size {
    L = "L",
    M = "M",
    S = "S",
    XL = "XL",
    XS = "XS"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createGroupWithDress(request: Group): Promise<string>;
    getAllDresses(): Promise<Array<Dress>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDress(id: DressId): Promise<Dress>;
    getFullGroupDetails(groupId: GroupId): Promise<Group>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    postDressPhotos(photos: Array<ExternalBlob>, _photoType: string): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchDresses(params: FindDressParams): Promise<Array<Dress>>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
