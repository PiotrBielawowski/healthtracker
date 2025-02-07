"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FoodItem {
  id: string
  name: string
  calories: number
  amount: number
}

interface StatisticsProps {
  foodEntries: FoodItem[]
  waterIntake: number
  bmi: number | null
}

export default function Statistics({ foodEntries, waterIntake, bmi }: StatisticsProps) {
  const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories * entry.amount, 0)
  const waterProgress = (waterIntake / 2000) * 100 // Assuming 2000ml daily goal

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Calories Consumed</p>
          <p className="text-2xl font-bold">{totalCalories} kcal</p>
        </div>
        <div>
          <p className="text-sm font-medium">Water Intake</p>
          <p className="text-2xl font-bold">{waterIntake} ml</p>
          <p className="text-sm text-muted-foreground">{waterProgress.toFixed(0)}% of daily goal</p>
        </div>
        {bmi !== null && (
          <div>
            <p className="text-sm font-medium">BMI</p>
            <p className="text-2xl font-bold">{bmi.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">
              {bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal weight" : bmi < 30 ? "Overweight" : "Obese"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

