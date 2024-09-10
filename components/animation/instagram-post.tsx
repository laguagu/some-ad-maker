"use client";

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Bookmark,
  Check,
  Heart,
  MessageCircle,
  MoreVertical,
  Send,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BackgroundGradient } from "../ui/background-gradient";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
// Kovakoodatut props
const EXAMPLE_POST = {
  analysis: {
    furniture: "Vintage Nojatuoli",
    price: "250€",
    description:
      "Upea 60-luvun klassikko, täydellinen lisä skandinaaviseen sisustukseen. Pähkinäpuuta, uudelleenverhoiltu laadukkaalla kankaalla.",
    keyFeatures: [
      "Alkuperäinen 60-luvun design",
      "Uudelleenverhoiltu",
      "Pähkinäpuinen runko",
      "Erinomainen kunto",
    ],
    callToAction: "Varaa tämä uniikki kappale nyt!",
    hashtags: ["#vintage", "#sisustus", "#huonekalut", "#60luku"],
  },
  imageUrl: "/examples/nojatuoli.jpg",
  storeName: "VintageAarteet",
};

function InstagramPost() {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const animationDuration = 1.0; // seconds
  const animationProgress = useRef(0);

  useEffect(() => {
    setIsAnimationReady(true);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !isAnimationReady) return;

    if (animationProgress.current < animationDuration) {
      const progress = animationProgress.current / animationDuration;
      const scale = THREE.MathUtils.lerp(0.1, 1, progress);
      const opacity = THREE.MathUtils.lerp(0, 1, progress);

      groupRef.current.scale.set(scale, scale, scale);

      // Apply opacity to all children with materials
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const meshChild = child as THREE.Mesh;
          if (meshChild.material && "opacity" in meshChild.material) {
            meshChild.material.opacity = opacity;
          }
        }
      });

      animationProgress.current += delta;
    }
  });

  return (
    <group ref={groupRef}>
      <Html
        transform
        occlude
        scale={viewport.width > 4 ? 0.4 : 0.25}
        position={[0, 0, 0]}
        center
      >
        <BackgroundGradient>
          <div className="flex justify-center w-[400px] select-none">
            <Card className="w-[400px] max-w-md">
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {EXAMPLE_POST.storeName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-semibold" style={{ userSelect: "none" }}>
                      {EXAMPLE_POST.storeName}
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      style={{ marginTop: "-4px", userSelect: "none" }}
                    >
                      Sponsoroitu
                    </p>
                  </div>
                </div>
                <MoreVertical
                  className="h-5 w-5"
                  style={{ userSelect: "none" }}
                />
              </CardHeader>
              <CardContent className="p-0">
                <Image
                  width={400}
                  height={400}
                  priority
                  src={EXAMPLE_POST.imageUrl}
                  alt={EXAMPLE_POST.analysis.furniture}
                  className="w-full h-auto object-cover aspect-square"
                />
              </CardContent>
              <CardFooter className="flex flex-col p-4">
                <div className="flex justify-between items-center w-full mb-4">
                  <div className="flex gap-4">
                    <Heart className="h-6 w-6" style={{ userSelect: "none" }} />
                    <MessageCircle
                      className="h-6 w-6"
                      style={{ userSelect: "none" }}
                    />

                    <Send className="h-6 w-6" style={{ userSelect: "none" }} />
                  </div>
                  <Bookmark
                    className="h-6 w-6"
                    style={{ userSelect: "none" }}
                  />
                </div>
                <div className="space-y-2">
                  <h2
                    className="font-bold text-lg"
                    style={{ userSelect: "none" }}
                  >
                    {EXAMPLE_POST.analysis.furniture}
                  </h2>
                  <p className="font-semibold" style={{ userSelect: "none" }}>
                    {EXAMPLE_POST.analysis.price}
                  </p>
                  <p style={{ userSelect: "none" }}>
                    {EXAMPLE_POST.analysis.description}
                  </p>
                  <ul className="space-y-1">
                    {EXAMPLE_POST.analysis.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check
                          className="h-4 w-4 text-green-500"
                          style={{ userSelect: "none" }}
                        />
                        <span style={{ userSelect: "none" }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-semibold" style={{ userSelect: "none" }}>
                    {EXAMPLE_POST.analysis.callToAction}
                  </p>
                  <p
                    className="text-sm text-blue-500"
                    style={{ userSelect: "none" }}
                  >
                    {EXAMPLE_POST.analysis.hashtags.join(" ")}
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </BackgroundGradient>
      </Html>
    </group>
  );
}

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <InstagramPost />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
