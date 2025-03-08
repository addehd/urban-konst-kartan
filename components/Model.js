import { useEffect, useRef, useState } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

const Model = ({ modelUrl, modelScale = 2, showGround = false, mapCoordinates, mapInstance }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    console.log('Model component mounted, initializing with:', { modelUrl, mapCoordinates });
    setLoading(true);
    setError(null);
    
    // create the babylon engine
    const engine = new BABYLON.Engine(canvasRef.current, true, { 
      preserveDrawingBuffer: true, 
      stencil: true,
      disableWebGL2Support: false,
      powerPreference: "low-power", // less demanding on GPU
      alpha: true // enable alpha channel for transparency
    });
    
    // create a basic scene with transparent background
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // fully transparent background
    
    // add a camera
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvasRef.current, true);
    camera.wheelPrecision = 50; // slower zoom
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 50;
    
    // add lights
    const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light1.intensity = 0.7;
    
    const light2 = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(0, -1, 1), scene);
    light2.intensity = 0.5;
    
    // add a ground plane for reference (optional)
    if (showGround) {
      const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 20}, scene);
      const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
      groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      groundMaterial.alpha = 0.5; // semi-transparent ground
      ground.material = groundMaterial;
    }
    
    // load the 3D model
    BABYLON.SceneLoader.ImportMesh("", modelUrl, "", scene, 
      function (meshes) {
        // success callback
        console.log("Model loaded successfully:", meshes);
        setLoading(false);
        
        if (meshes.length > 0) {
          const rootMesh = meshes[0];
          rootMesh.scaling = new BABYLON.Vector3(modelScale, modelScale, modelScale);
          
          // position the camera to view the model
          camera.target = rootMesh.position;
          
          // If we have map coordinates and map instance, update model position when map moves
          if (mapInstance && mapCoordinates) {
            // Initial positioning
            updateModelPosition(rootMesh, mapCoordinates, mapInstance);
            
            // Update position when map moves
            mapInstance.on('move', () => {
              updateModelPosition(rootMesh, mapCoordinates, mapInstance);
            });
          }
        }
      },
      null,
      function (scene, message, exception) {
        // error callback
        console.error("Error loading model:", message, exception);
        setLoading(false);
        setError(`Failed to load model: ${message}`);
        
        // create a fallback cube
        const cube = BABYLON.MeshBuilder.CreateBox("cube", {size: 2}, scene);
        const cubeMat = new BABYLON.StandardMaterial("cubeMat", scene);
        cubeMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
        cube.material = cubeMat;
      }
    );
    
    // Function to update model position based on map coordinates
    function updateModelPosition(mesh, coordinates, map) {
      if (!map || !coordinates || !mesh) return;
      
      // Convert geo coordinates to pixel coordinates
      const pixelCoords = map.project([coordinates.lng, coordinates.lat]);
      
      // Convert pixel coordinates to Babylon.js coordinates
      // This is a simplified conversion - you may need to adjust based on your scene scale
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      
      // Map pixel coordinates to normalized device coordinates (-1 to 1)
      const ndcX = (pixelCoords.x / canvasWidth) * 2 - 1;
      const ndcY = 1 - (pixelCoords.y / canvasHeight) * 2;
      
      // Set mesh position (adjust the scale factor as needed)
      mesh.position.x = ndcX * 10;
      mesh.position.z = ndcY * 10;
      
      // Optionally set y position based on elevation if available
      if (coordinates.elevation) {
        mesh.position.y = coordinates.elevation * 0.01;
      }
    }
    
    // handle resize
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);
    
    // start the render loop
    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
    
    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
      scene.dispose();
    };
  }, [modelUrl, modelScale, showGround, mapCoordinates, mapInstance]);
  
  return (
    <>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block',
          touchAction: 'none',
          background: 'transparent',
          pointerEvents: 'auto' // Allow interaction with the canvas
        }} 
      />
      {loading && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          background: 'rgba(0,0,0,0.7)', 
          color: 'white', 
          padding: '10px', 
          borderRadius: '5px', 
          zIndex: 1000 
        }}>
          Loading 3D model...
        </div>
      )}
      {error && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          background: 'rgba(255,0,0,0.7)', 
          color: 'white', 
          padding: '10px', 
          borderRadius: '5px', 
          zIndex: 1000 
        }}>
          {error}
        </div>
      )}
    </>
  );
};

export default Model; 