import { useEffect, useRef, useState } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

const Model = ({ 
  modelUrl, 
  modelScale = 2, 
  maxScaleFactor = 3, 
  minScaleFactor = 2, showGround = false, mapCoordinates, mapInstance, tiltX = 39, tiltY = 40, tiltZ = 0, link,
  gradientColors = [
    { stop: 0.2, color: '#ff8000' },
    { stop: 0.4, color: '#00ff80' },
    { stop: 0.6, color: '#0080ff' },
    { stop: 0.8, color: '#8000ff' },
    { stop: 1.0, color: '#ff00ff' }
  ]
}) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const modelRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    console.log('Model component mounted, initializing with:', { modelUrl, mapCoordinates });
    setLoading(true);
    setError(null);
    
    // create the babylon engine with alpha
    const engine = new BABYLON.Engine(canvasRef.current, true, { 
      preserveDrawingBuffer: true, 
      stencil: true,
      disableWebGL2Support: false,
      powerPreference: "low-power",
      alpha: true,
      premultipliedAlpha: false
    });
    
    // create a basic scene with transparent background
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    scene.autoClear = true;
    scene.alphaMode = BABYLON.Engine.ALPHA_PREMULTIPLIED;
    
    // add a fixed camera that doesn't move
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 15, -20), scene);
    camera.setTarget(new BABYLON.Vector3(0, -6, 0)); // look even more down
    
    // add lights
    const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light1.intensity = 0.7;
    
    const light2 = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(0, -1, 1), scene);
    light2.intensity = 0.5;
    

    // load the 3D model
    BABYLON.SceneLoader.ImportMesh("", modelUrl, "", scene, 
      function (meshes) {
        console.log("Model loaded successfully:", meshes);
        setLoading(false);
        
        if (meshes.length > 0) {
          // Create a parent container for the model
          const modelContainer = new BABYLON.TransformNode("modelContainer", scene);
          
          // create gradient metallic material
          const material = new BABYLON.StandardMaterial("gradientMaterial", scene);
          material.metallic = 0.9;  // increased metallic
          material.roughness = 0.1; // decreased roughness for more shine
          
          // create dynamic texture for gradient
          const texture = new BABYLON.DynamicTexture("gradientTexture", {width: 512, height: 512}, scene); // increased resolution
          const ctx = texture.getContext();
          
          // create more complex gradient
          const gradient = ctx.createLinearGradient(0, 0, 512, 512);
          gradientColors.forEach(({ stop, color }) => {
            gradient.addColorStop(stop, color);
          });
          
          // apply gradient
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 512, 512);
          texture.update();
          
          // enhance material properties
          material.diffuseTexture = texture;
          material.specularColor = new BABYLON.Color3(1, 1, 1); // bright specular highlights
          material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3); // increased glow
          material.useGlossinessFromSpecularMapAlpha = true;
          
          // Parent all meshes to the container
          meshes.forEach(mesh => {
            mesh.parent = modelContainer;
            mesh.material = material;
            
            // Make the mesh pickable even when canvas has pointerEvents: none
            if (link) {
              mesh.isPickable = true;
              
              // Create an overlay div for handling clicks
              const overlayDiv = document.createElement('div');
              overlayDiv.style.position = 'absolute';
              overlayDiv.style.top = '0';
              overlayDiv.style.left = '0';
              overlayDiv.style.width = '100%';
              overlayDiv.style.height = '100%';
              overlayDiv.style.pointerEvents = 'auto';
              overlayDiv.style.background = 'transparent';
              overlayDiv.style.zIndex = '1';
              canvasRef.current.parentNode.appendChild(overlayDiv);
              
              // Add click event to the overlay
              overlayDiv.addEventListener('click', (event) => {
                // Get pick info at the click position
                const pickResult = scene.pick(
                  event.offsetX,
                  event.offsetY,
                  null,
                  false,
                  camera
                );
                
                // If we picked one of our model meshes, open the link
                if (pickResult.hit && pickResult.pickedMesh && 
                    meshes.includes(pickResult.pickedMesh)) {
                  window.open(link, '_blank');
                }
              });
              
              // Update cursor on hover
              overlayDiv.addEventListener('mousemove', (event) => {
                const pickResult = scene.pick(
                  event.offsetX,
                  event.offsetY,
                  null,
                  false,
                  camera
                );
                
                if (pickResult.hit && pickResult.pickedMesh && 
                    meshes.includes(pickResult.pickedMesh)) {
                  overlayDiv.style.cursor = 'pointer';
                } else {
                  overlayDiv.style.cursor = 'default';
                }
              });
              
              // Clean up on component unmount
              return () => {
                if (overlayDiv.parentNode) {
                  overlayDiv.parentNode.removeChild(overlayDiv);
                }
              };
            }
          });
          
          // Set initial scale
          modelContainer.scaling = new BABYLON.Vector3(
            modelScale * 10, 
            modelScale * 10, 
            modelScale * 10
          );
          
          // move model down slightly
          modelContainer.position.y = -6;
          
          // Store reference to container for updates
          modelRef.current = modelContainer;
          
          // Position camera to view the model
          camera.setTarget(modelContainer.position);
          
          // Apply initial tilt if any axis has a non-zero value
          if (tiltX !== 0 || tiltY !== 0 || tiltZ !== 0) {
            applyModelTilt(modelContainer, tiltX, tiltY, tiltZ);
          }
          
          
          // If link is provided, set up click detection
          if (link && canvasRef.current) {
            // Create a small clickable div positioned over the model
            const clickableDiv = document.createElement('div');
            clickableDiv.style.position = 'absolute';
            clickableDiv.style.width = '50px';  // Small enough to not interfere with map dragging
            clickableDiv.style.height = '50px';
            clickableDiv.style.left = '50%';
            clickableDiv.style.top = '80%';
            clickableDiv.style.transform = 'translate(-50%, -50%)';
            clickableDiv.style.pointerEvents = 'auto';
            clickableDiv.style.cursor = 'pointer';
            clickableDiv.style.zIndex = '20';
            clickableDiv.style.background = 'transparent';
            
            // Add click handler
            clickableDiv.addEventListener('click', (e) => {
              e.stopPropagation();
              window.open(link, '_blank');
            });
            
            // Add to DOM
            if (canvasRef.current.parentNode) {
              canvasRef.current.parentNode.appendChild(clickableDiv);
            }
            
            // Clean up on unmount
            return () => {
              if (clickableDiv.parentNode) {
                clickableDiv.parentNode.removeChild(clickableDiv);
              }
            };
          }
        } else {
          console.warn("Model loaded but no meshes found:", modelUrl);
          setError("Model loaded but contains no meshes");
        }
      },
      null,
      function (scene, message, exception) {
        console.error("Error loading model:", {
          url: modelUrl,
          message: message,
          exception: exception
        });
        setLoading(false);
        setError(`Failed to load model: ${message}`);
      }
    );
    
    // Function to update model position based on map coordinates
    // function updateModelPosition(mesh, coordinates, map) {
    //   if (!map || !coordinates || !mesh) return;
      
    //   try {
    //     // Get the current center of the map view
    //     const mapCenter = map.getCenter();

    //     const mapZoom = map.getZoom();
        
    //     // Calculate the distance in meters between the model coordinates and map center
    //     // Using the Haversine formula approximation
    //     const R = 6371000; // Earth radius in meters
    //     const lat1 = mapCenter.lat * Math.PI/180;
    //     const lat2 = coordinates.lat * Math.PI/180;
    //     const lon1 = mapCenter.lng * Math.PI/180;
    //     const lon2 = coordinates.lng * Math.PI/180;
        
    //     // x distance (east-west)
    //     const x = R * Math.cos((lat1 + lat2)/2) * (lon2 - lon1);
        
    //     // y distance (north-south)
    //     const y = R * (lat2 - lat1);
        
    //     // Scale factor based on zoom level
    //     // At zoom level 15, 1 meter in the real world should correspond to our desired scene scale
    //     const baseZoom = 15;
    //     const zoomScale = Math.pow(2, mapZoom - baseZoom);
        
    //     // Set the model position
    //     // In Babylon.js, x is east-west, z is north-south
    //     mesh.position.x = x * 0.01 * zoomScale; // Scale down by 0.01 to fit in scene
    //     mesh.position.z = y * 0.01 * zoomScale;
        
    //     // Set elevation if available
    //     if (coordinates.elevation !== undefined) {
    //       mesh.position.y = coordinates.elevation * 0.01 * zoomScale;
    //     } else {
    //       mesh.position.y = 0;
    //     }
        
    //     // Adjust model scale based on zoom to maintain apparent size
    //     // Calculate the scale adjustment
    //     let scaleAdjustment = modelScale * (1 / zoomScale);
        
    //     // Apply maximum scale constraint
    //     const maxScale = modelScale * maxScaleFactor;
    //     if (scaleAdjustment > maxScale) {
    //       scaleAdjustment = maxScale;
    //     }
        
    //     // Apply minimum scale constraint
    //     const minScale = modelScale * minScaleFactor;
    //     if (scaleAdjustment < minScale) {
    //       scaleAdjustment = minScale;
    //     }
        
    //     // Apply the constrained scale
    //     mesh.scaling.set(scaleAdjustment, scaleAdjustment, scaleAdjustment);
        
    //     console.log('Updated model position:', { 
    //       mapZoom,
    //       scaleAdjustment,
    //       maxScale,
    //       minScale
    //     });
    //   } catch (error) {
    //     console.error('Error updating model position:', error);
    //   }
    // }
    
    // Function to apply tilt to the model on all axes
    function applyModelTilt(mesh, x, y, z) {
      if (!mesh) return;
      
      try {
        // convert tilt angles to radians
        const xRad = x * Math.PI / 180;
        const yRad = y * Math.PI / 180;
        const zRad = z * Math.PI / 180;
        
        // apply tilts to respective axes
        // note: this will override any existing rotation
        mesh.rotation.x += xRad;
        mesh.rotation.y += yRad;
        mesh.rotation.z += zRad;
        
        console.log('Applied tilt to model:', { x, y, z });
      } catch (error) {
        console.error('Error applying tilt to model:', error);
      }
    }
    
    // add this after creating the model container
    let rotationSpeed = 0.03; // speed of rotation in radians per frame
    
    // modify the render loop
    engine.runRenderLoop(() => {
      if (scene && modelRef.current) {
        modelRef.current.rotation.z += rotationSpeed;
        scene.render();
      }
    });
    
    // add zoom scale handler
    const handleZoom = () => {
      if (!modelRef.current || !mapInstance) return;
      
      const zoom = mapInstance.getZoom();
      const baseZoom = 14; // base zoom level
      let zoomScale = 1;
      
      // scale down when zooming out
      if (zoom < baseZoom) {
        zoomScale = Math.max(0.3, (zoom / baseZoom)); // minimum scale of 0.3
      }
      
      modelRef.current.scaling = new BABYLON.Vector3(
        modelScale * 10 * zoomScale,
        modelScale * 10 * zoomScale,
        modelScale * 10 * zoomScale
      );
    };

    // add map zoom listener
    if (mapInstance) {
      mapInstance.on('zoom', handleZoom);
    }

    // cleanup zoom listener
    return () => {
      if (mapInstance) {
        mapInstance.off('zoom', handleZoom);
      }
      engine.dispose();
      scene.dispose();
    };
  }, [modelUrl, modelScale, maxScaleFactor, minScaleFactor, showGround, mapCoordinates, mapInstance, tiltX, tiltY, tiltZ]);
  
  return (
    <div style={{ 
      position: 'relative', 
      width: '150px',
      height: '150px',
      pointerEvents: 'none',
      margin: 'auto',
      background: 'transparent'
    }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block',
          touchAction: 'none',
          background: 'transparent',
          pointerEvents: 'none',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          backgroundColor: 'transparent'
        }} 
      />
      {link && (
        <div 
          style={{
            position: 'absolute',
            top: '80%',    // changed from 65% to 80% to move much lower
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50px',
            height: '50px', 
            borderRadius: '50%',
            pointerEvents: 'auto',
            cursor: 'pointer',
            zIndex: 20,
            background: 'transparent'
          }}
          onClick={() => window.open(link, '3d.cfuk.nu')}
        />
      )}
    </div>
  );
};

export default Model; 
