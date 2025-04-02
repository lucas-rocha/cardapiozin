'use client'

import Layout from "@/app/page"
import PrivateRoute from "@/components/PrivateRoute"
import { updateNotificationStatus } from "@/services/notification"
import { useEffect, useState } from "react"

export default function Notification({ params }: { params: { id: string } }) {
  const [notification, setNotification] = useState([])
  const { id } = params

  useEffect(() => {
    updateNotificationStatus(id)
      .then(response => {
        console.log(response)
      })
  })

  return (
    <PrivateRoute>
      <Layout>
        <div></div>
      </Layout>
    </PrivateRoute>
  )
}
