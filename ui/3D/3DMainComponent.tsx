'use client'
import Simplex from './3DSimplex';
import { useRef } from 'react'
import { Canvas } from 'react-three-fiber';


const Modal = () => {
    const hoverRef = useRef<any>(null);

    const handlePointerMove = (e: any) => {
        // Update the position of the hover reference to match the cursor position
        hoverRef.current.position.set(e.clientX, e.clientY, 0);
    };

    return (
        <Canvas onPointerMove={handlePointerMove}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Simplex />
            <mesh ref={hoverRef}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshBasicMaterial color="blue" />
            </mesh>
        </Canvas>
    );
};


export default Modal