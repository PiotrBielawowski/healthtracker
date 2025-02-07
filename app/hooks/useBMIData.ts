import { useState, useCallback } from "react"

type ActivityLevel = "sedentary" | "light" | "moderate" | "very" | "super"

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  super: 1.9,
}

export function useBMIData() {
  const [weight, setWeight] = useState<number | null>(null)
  const [height, setHeight] = useState<number | null>(null)
  const [age, setAge] = useState<number | null>(null)
  const [gender, setGender] = useState<"male" | "female">("female")
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("sedentary")
  const [bmr, setBMR] = useState<number | null>(null)
  const [tdee, setTDEE] = useState<number | null>(null)

  const calculateBMI = useCallback((weight: number, height: number) => {
    const heightInMeters = height / 100
    return weight / (heightInMeters * heightInMeters)
  }, [])

  const calculateBMR = useCallback(() => {
    if (!weight || !height || !age) return null

    let calculatedBMR: number

    if (gender === "female") {
      calculatedBMR = 10 * weight + 6.25 * height - 5 * age - 161
    } else {
      calculatedBMR = 10 * weight + 6.25 * height - 5 * age + 5
    }

    setBMR(Math.round(calculatedBMR))
    return Math.round(calculatedBMR)
  }, [weight, height, age, gender])

  const calculateTDEE = useCallback(() => {
    const calculatedBMR = calculateBMR()
    if (calculatedBMR === null) return null

    const calculatedTDEE = Math.round(calculatedBMR * activityMultipliers[activityLevel])
    setTDEE(calculatedTDEE)
    return calculatedTDEE
  }, [calculateBMR, activityLevel])

  const updateBMIData = useCallback(
    (w: number, h: number, a: number, g: "male" | "female", al: ActivityLevel) => {
      setWeight(w)
      setHeight(h)
      setAge(a)
      setGender(g)
      setActivityLevel(al)
      calculateTDEE()
    },
    [calculateTDEE],
  )

  return {
    weight,
    height,
    age,
    gender,
    activityLevel,
    bmr,
    tdee,
    setWeight,
    setHeight,
    setAge,
    setGender,
    setActivityLevel,
    calculateBMI,
    calculateBMR,
    calculateTDEE,
    updateBMIData,
  }
}

