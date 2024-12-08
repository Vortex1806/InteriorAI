import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Upload, Paintbrush, Download, HeadphonesIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "./dashboard/_components/Header"
import { Footer } from "@/components/ui/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="px-4 py-10 md:py-10 lg:py-10 space-y-12 text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100"
            >
              <Badge variant="secondary">New</Badge>
              <span className="ml-2">Created By Shubh Vora</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                AI Room and Home
                <span className="block text-primary">Interior Design</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-500">
                Transform Your Space with AI: Effortless Room & Home Interior Design at Your Fingertips!
              </p>
            </div>
            <Button className="bg-primary text-lg" size="lg">
              Get started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Before/After Section */}
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <Image
                src="/Industrial.jpeg"
                alt="Before: Original Room"
                width={500}
                height={333}
                className="rounded-lg"
              />
              <Image
                src="/after.png"
                alt="After: Transformed Room"
                width={500}
                height={333}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-12 md:py-24 lg:py-32 max-w-7xl mx-auto">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-6">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Upload</h3>
              <p className="text-sm sm:text-base text-gray-500">Upload Your Room Picture</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-6">
                <Paintbrush className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Select Design</h3>
              <p className="text-sm sm:text-base text-gray-500">Select Design and Room Type</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-6">
                <Download className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Ready to Download</h3>
              <p className="text-sm sm:text-base text-gray-500">Your Room / Home Interior Design is Ready</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-6">
                <HeadphonesIcon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">24/7 Support</h3>
              <p className="text-sm sm:text-base text-gray-500">Contact us 24 hours a day, 7 days a week</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

