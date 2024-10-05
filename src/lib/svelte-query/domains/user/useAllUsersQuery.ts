import { queryKeys } from '$lib/svelte-query/queryKeys';
import { createQuery } from '@tanstack/svelte-query';
import { getAllUsers } from '../../../../orval/users/users';

export const useAllUsersQuery = () => {
	const query = createQuery({
		queryKey: queryKeys.users,
		queryFn: () => getAllUsers().then((res) => res.data)
	});
	return query;
};
