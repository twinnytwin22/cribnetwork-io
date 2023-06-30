
'use client'
import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Sphere } from 'three';

const Simplex = () => {
    const simplexRef = useRef<any>(null);
    const hoverRef = useRef<any>(null);


    useFrame(() => {
        simplexRef.current.rotation.x += 0.01;
        simplexRef.current.rotation.y += 0.01;
    });

    const handlePointerMove = (e: any) => {
        const { clientX, clientY } = e;
        hoverRef.current.position.set(clientX, clientY, 0);

        // Calculate the cursor position relative to the canvas
        const canvasBounds = e.target.getBoundingClientRect();
        const cursorX = ((clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
        const cursorY = -((clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

        // Deform the vertices based on the cursor position
        const vertices = simplexRef.current.children;
        for (let i = 0; i < vertices.length; i++) {
            const vertex = vertices[i];
            const originalPosition = vertex.userData.originalPosition;
            const deformationStrength = calculateDeformationStrength(
                originalPosition,
                cursorX,
                cursorY
            );
            vertex.position.lerpVectors(originalPosition, hoverRef.current.position, deformationStrength);
        }
    };

    // Function to calculate the deformation strength based on vertex position and cursor position
    // Function to calculate the deformation strength based on vertex position and cursor position
    const calculateDeformationStrength = (vertexPosition: any, cursorX: any, cursorY: any) => {
        // Customize the calculation based on your desired criteria
        // Here's a simple example that deforms the vertex based on distance to the cursor position
        const distance = Math.sqrt(
            Math.pow(vertexPosition.x - cursorX, 2) + Math.pow(vertexPosition.y - cursorY, 2)
        );
        const maxDistance = 1; // Define the maximum distance for full deformation
        const deformationStrength = Math.max(0, 1 - distance / maxDistance);
        return deformationStrength;
    };


    return (
        <group ref={simplexRef}>
            <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="red" />
            </mesh>
            {/* Define and position the remaining vertices */}
            <mesh ref={hoverRef}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshBasicMaterial color="blue" />
            </mesh>
        </group>
    );
};

export default Simplex;