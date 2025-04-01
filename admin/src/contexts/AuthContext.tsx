'use client'

import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

type Restaurant = {
  restaurant_name: string;
}

type Restaurants = {
  restaurant_id: string;
  restaurant: Restaurant;
  role: string;
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  photo_url: string;
  email: string;
  password: string;
  position: string;
  phone: string;
  role: string;
  restaurant_id: string;
  restaurants: Restaurants[]
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  restaurant: Restaurants | null;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  role: string;
  changeRestaurant: (token: string) => void;
  signIn: (data: SignInData) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  const [restaurant, setRestaurant] = useState<Restaurants | null>(null)
  const [role, setRole] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!restaurant
  
  useEffect(() => {
    const { '@cardapiozin.token': token } = parseCookies()

    if(token) {
      api.defaults.headers['x-access-token'] = token

      Promise.all([
        api.get('restaurants/me').then(response => {
          setRestaurant(response.data)
          setLoading(false)
        }),

        api.get('users/me').then(response => {
          setUser(response.data)
  
          setRole(response.data.role)

          if(!response.data.is_email_verified) {
            router.push('/verificar-email')
          }
        })
      ]).finally(() => {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }

  }, [])

  async function changeRestaurant(token: string) {
    setCookie(undefined, '@cardapiozin.token', token, {
      maxAge: 60 * 60 * 1
    })
    
    api.defaults.headers['x-access-token'] = token
    
    if(token) {
      api.get('restaurants/me').then(response => {
        setRestaurant(response.data)
      })

      api.get('users/me').then(response => {
        setUser(response.data)
      })
    }
  }

  async function signIn({ email, password }: SignInData) {
    const response = await api.post('auth/login', {
      email,
      password
    })
    
    const { token } = await response.data

    
    setCookie(undefined, '@cardapiozin.token', token, {
      maxAge: 60 * 60 * 1
    })
    
    api.defaults.headers['x-access-token'] = token
    
    if(token) {
      api.get('restaurants/me').then(response => {
        setRestaurant(response.data)
      })

      api.get('users/me').then(response => {
        setUser(response.data)

        if(!response.data.is_email_verified) {
          router.push('/verificar-email')
        }
      })
    }
  }

  function logout() {
    destroyCookie(undefined, '@cardapiozin.token')

    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ restaurant, role, isAuthenticated, signIn, loading, logout, user, setUser, changeRestaurant }}>
      {children}
    </AuthContext.Provider>
  )
}