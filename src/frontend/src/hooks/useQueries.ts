import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Dress, FindDressParams, UserProfile, Group, ExternalBlob } from '../backend';
import { useInternetIdentity } from './useInternetIdentity';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetAllDresses() {
  const { actor, isFetching } = useActor();

  return useQuery<Dress[]>({
    queryKey: ['dresses'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDresses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetDress(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Dress>({
    queryKey: ['dress', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDress(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useSearchDresses(params: FindDressParams) {
  const { actor, isFetching } = useActor();

  return useQuery<Dress[]>({
    queryKey: ['searchDresses', params],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchDresses(params);
    },
    enabled: !!actor && !isFetching && !!params.searchTerm,
  });
}

export function useCreateGroup() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      photos: ExternalBlob[];
      productLink?: string;
      brand: string;
      color: string;
      size: string;
      occasion: string;
      originalPrice: string;
      authenticityProof: ExternalBlob;
      groupSize: number;
      rotationCity: string;
      priorityFees: number[];
    }) => {
      if (!actor || !identity) throw new Error('Actor or identity not available');

      const dressId = `dress_${Date.now()}`;
      const groupId = `group_${Date.now()}`;

      // Create dress and group
      const group: Group = {
        id: groupId,
        dressId,
        members: [],
        rotationSchedule: [],
        currentHolder: undefined,
        chatRoomId: `chat_${groupId}`,
        currentStatus: 'forming',
        conditionPhotos: [],
        handOverPhotos: [],
      };

      await actor.createGroupWithDress(group);
      await actor.postDressPhotos(data.photos, 'dress');

      return groupId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dresses'] });
    },
  });
}
