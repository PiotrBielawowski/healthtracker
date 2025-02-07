import { useState, useEffect } from "react"

interface FoodEntry {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  amount: number
}

export function useFoodEntries() {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([])
  const [totalCalories, setTotalCalories] = useState(0)

  useEffect(() => {
    const newTotalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories * entry.amount, 0)
    setTotalCalories(newTotalCalories)
  }, [foodEntries])

  const addFood = (food: Omit<FoodEntry, "amount">) => {
    setFoodEntries((prevEntries) => [...prevEntries, { ...food, amount: 1 }])
  }

  const updateFoodAmount = (id: string, newAmount: number) => {
    if (newAmount < 0) return
    setFoodEntries((prevEntries) =>
      prevEntries.map((entry) => (entry.id === id ? { ...entry, amount: newAmount } : entry)),
    )
  }

  return { foodEntries, addFood, totalCalories, updateFoodAmount }
}

