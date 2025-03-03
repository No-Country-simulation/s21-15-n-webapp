"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoTab } from "./personal-info-tab"
import { SocialLinksTab } from "./social-links-tab"
import { SecurityTab } from "./security-tab"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-primary/5">
        <TabsTrigger value="personal">Datos Personales</TabsTrigger>
        <TabsTrigger value="social">Redes Sociales</TabsTrigger>
        <TabsTrigger value="security">Seguridad</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <PersonalInfoTab />
      </TabsContent>
      <TabsContent value="social">
        <SocialLinksTab />
      </TabsContent>
      <TabsContent value="security">
        <SecurityTab />
      </TabsContent>
    </Tabs>
  )
}

