import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

interface UserData {
  id: string
  name: string
  foodEntries: any[]
  waterIntake: number
  goals: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

const fetchUserData = async (userId: string): Promise<UserData> => {
  const response = await fetch(`/api/user?userId=${userId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch user data")
  }
  return response.json()
}

const saveUserData = async ({ userId, data }: { userId: string; data: Partial<UserData> }): Promise<void> => {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, userData: data }),
  })
  if (!response.ok) {
    throw new Error("Failed to save user data")
  }
}

export function useUserData(userId: string) {
  const queryClient = useQueryClient()

  const { data: userData, error } = useQuery<UserData, Error>({
    queryKey: ["userData", userId],
    queryFn: () => fetchUserData(userId),
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
  })

  const mutation = useMutation({
    mutationFn: saveUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData", userId] })
    },
  })

  const updateUserData = (data: Partial<UserData>) => {
    mutation.mutate({ userId, data })
  }

  return { userData, error, updateUserData }
}

