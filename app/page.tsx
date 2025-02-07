"use client"

import { useState } from "react"
import BMICalculator from "./components/BMICalculator"
import FoodEntry from "./components/FoodEntry"
import Statistics from "./components/Statistics"
import WaterIntake from "./components/WaterIntake"
import WeeklyView from "./components/WeeklyView"

interface FoodItem {
  id: string
  name: string
  calories: number
  amount: number
}

export default function Home() {
  const [foodEntries, setFoodEntries] = useState<FoodItem[]>([])
  const [waterIntake, setWaterIntake] = useState(0)
  const [bmi, setBMI] = useState<number | null>(null)

  const handleAddFood = (food: FoodItem) => {
    setFoodEntries((prev) => [...prev, food])
  }

  const handleUpdateFoodAmount = (id: string, amountChange: number) => {
    setFoodEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, amount: Math.max(0, entry.amount + amountChange) } : entry)),
    )
  }

  const handleWaterIntakeUpdate = (newIntake: number) => {
    setWaterIntake(newIntake)
  }

  const handleBMICalculation = (newBMI: number) => {
    setBMI(newBMI)
  }

  return (
    <main className="container mx-auto p-4 space-y-6">
      <h1 className="text-4xl font-bold text-center text-primary">Health Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BMICalculator onBMICalculation={handleBMICalculation} />
        <FoodEntry foodEntries={foodEntries} onAddFood={handleAddFood} onUpdateFoodAmount={handleUpdateFoodAmount} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Statistics foodEntries={foodEntries} waterIntake={waterIntake} bmi={bmi} />
        <WaterIntake intake={waterIntake} onUpdate={handleWaterIntakeUpdate} />
      </div>
      <WeeklyView foodEntries={foodEntries} />
    </main>
  )
}

