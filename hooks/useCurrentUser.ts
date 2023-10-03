import useSwr from "swr";
import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
	"use server";
	const { data, error, isLoading, mutate } = useSwr("/api/current", fetcher);
	return {
		data,
		error,
		isLoading,
		mutate,
	};
};

export default useCurrentUser;
