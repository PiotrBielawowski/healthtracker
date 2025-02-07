"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface BMICalculatorProps {
  onBMICalculation: (bmi: number) => void
}

export default function BMICalculator({ onBMICalculation }: BMICalculatorProps) {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBMI] = useState<number | null>(null)

  const calculateBMI = () => {
    const h = Number.parseFloat(height) / 100 // convert cm to m
    const w = Number.parseFloat(weight)
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h)
      setBMI(bmiValue)
      onBMICalculation(bmiValue)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
          />
        </div>
        <Button onClick={calculateBMI} className="w-full">
          Calculate BMI
        </Button>
        {bmi !== null && (
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold">Your BMI: {bmi.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">
              {bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal weight" : bmi < 30 ? "Overweight" : "Obese"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

