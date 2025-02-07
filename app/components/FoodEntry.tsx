"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface FoodItem {
  id: string
  name: string
  calories: number
  amount: number
}

interface FoodEntryProps {
  foodEntries: FoodItem[]
  onAddFood: (food: FoodItem) => void
  onUpdateFoodAmount: (id: string, amount: number) => void
}

export default function FoodEntry({ foodEntries, onAddFood, onUpdateFoodAmount }: FoodEntryProps) {
  const [foodName, setFoodName] = useState("")
  const [calories, setCalories] = useState("")

  const handleAddFood = () => {
    if (foodName && calories) {
      onAddFood({
        id: Date.now().toString(),
        name: foodName,
        calories: Number.parseInt(calories),
        amount: 1,
      })
      setFoodName("")
      setCalories("")
    }
  }

  const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories * entry.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Food Entry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="foodName">Food Name</Label>
          <Input
            id="foodName"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter food name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="calories">Calories</Label>
          <Input
            id="calories"
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Enter calories"
          />
        </div>
        <Button onClick={handleAddFood} className="w-full">
          Add Food
        </Button>
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">Today's Food:</h3>
          {foodEntries.map((entry) => (
            <div key={entry.id} className="flex justify-between items-center">
              <span>
                {entry.name} - {entry.calories * entry.amount} kcal
              </span>
              <div>
                <Button variant="outline" size="sm" onClick={() => onUpdateFoodAmount(entry.id, -1)}>
                  -
                </Button>
                <span className="mx-2">{entry.amount}</span>
                <Button variant="outline" size="sm" onClick={() => onUpdateFoodAmount(entry.id, 1)}>
                  +
                </Button>
              </div>
            </div>
          ))}
          <p className="font-semibold">Total Calories: {totalCalories} kcal</p>
        </div>
      </CardContent>
    </Card>
  )
}

