"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface WaterIntakeProps {
  intake: number
  onUpdate: (newIntake: number) => void
}

export default function WaterIntake({ intake, onUpdate }: WaterIntakeProps) {
  const goal = 2000 // 2 liters per day

  const handleAddWater = (amount: number) => {
    const newIntake = Math.min(intake + amount, goal)
    onUpdate(newIntake)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Intake</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={(intake / goal) * 100} className="w-full" />
        <p className="text-center">
          {intake} ml / {goal} ml
        </p>
        <div className="flex justify-center space-x-2">
          <Button onClick={() => handleAddWater(250)}>+250 ml</Button>
          <Button onClick={() => handleAddWater(500)}>+500 ml</Button>
        </div>
      </CardContent>
    </Card>
  )
}

