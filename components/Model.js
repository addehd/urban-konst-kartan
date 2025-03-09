import { useEffect, useRef, useState } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

const Model = ({ 
  modelUrl, 
  modelScale = 2, 
  maxScaleFactor = 3, 
  minScaleFactor = 2, showGround = false, mapCoordinates, mapInstance, tiltX = 39, tiltY = 40, tiltZ = 0, link }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const modelRef = useRef(null);
  
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
      powerPreference: "low-power",
      alpha: true
    });
    
    // create a basic scene with transparent background
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    
    // add a fixed camera that doesn't move
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    
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
          
          // Parent all meshes to the container
          meshes.forEach(mesh => {
            mesh.parent = modelContainer;
            
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
          modelContainer.scaling = new BABYLON.Vector3(modelScale, modelScale, modelScale);
          
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
            clickableDiv.style.top = '50%';
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
        }
      },
      null,
      function (scene, message, exception) {
        console.error("Error loading model:", message, exception);
        setLoading(false);
        setError(`Failed to load model: ${message}`);
        
        // create a fallback cube
        const cube = BABYLON.MeshBuilder.CreateBox("cube", {size: 2}, scene);
        const cubeMat = new BABYLON.StandardMaterial("cubeMat", scene);
        cubeMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
        cube.material = cubeMat;
        modelRef.current = cube;
      }
    );
    
    // Function to update model position based on map coordinates
    function updateModelPosition(mesh, coordinates, map) {
      if (!map || !coordinates || !mesh) return;
      
      try {
        // Get the current center of the map view
        const mapCenter = map.getCenter();

        const mapZoom = map.getZoom();
        
        // Calculate the distance in meters between the model coordinates and map center
        // Using the Haversine formula approximation
        const R = 6371000; // Earth radius in meters
        const lat1 = mapCenter.lat * Math.PI/180;
        const lat2 = coordinates.lat * Math.PI/180;
        const lon1 = mapCenter.lng * Math.PI/180;
        const lon2 = coordinates.lng * Math.PI/180;
        
        // x distance (east-west)
        const x = R * Math.cos((lat1 + lat2)/2) * (lon2 - lon1);
        
        // y distance (north-south)
        const y = R * (lat2 - lat1);
        
        // Scale factor based on zoom level
        // At zoom level 15, 1 meter in the real world should correspond to our desired scene scale
        const baseZoom = 15;
        const zoomScale = Math.pow(2, mapZoom - baseZoom);
        
        // Set the model position
        // In Babylon.js, x is east-west, z is north-south
        mesh.position.x = x * 0.01 * zoomScale; // Scale down by 0.01 to fit in scene
        mesh.position.z = y * 0.01 * zoomScale;
        
        // Set elevation if available
        if (coordinates.elevation !== undefined) {
          mesh.position.y = coordinates.elevation * 0.01 * zoomScale;
        } else {
          mesh.position.y = 0;
        }
        
        // Adjust model scale based on zoom to maintain apparent size
        // Calculate the scale adjustment
        let scaleAdjustment = modelScale * (1 / zoomScale);
        
        // Apply maximum scale constraint
        const maxScale = modelScale * maxScaleFactor;
        if (scaleAdjustment > maxScale) {
          scaleAdjustment = maxScale;
        }
        
        // Apply minimum scale constraint
        const minScale = modelScale * minScaleFactor;
        if (scaleAdjustment < minScale) {
          scaleAdjustment = minScale;
        }
        
        // Apply the constrained scale
        mesh.scaling.set(scaleAdjustment, scaleAdjustment, scaleAdjustment);
        
        console.log('Updated model position:', { 
          mapZoom,
          scaleAdjustment,
          maxScale,
          minScale
        });
      } catch (error) {
        console.error('Error updating model position:', error);
      }
    }
    
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
    
    // Modified function to update model rotation while preserving custom tilt
    function updateModelRotation(mesh, map, tiltX = 0, tiltY = 0, tiltZ = 0) {
      if (!map || !mesh) return;
      
      try {
        // Get map bearing (rotation) and pitch
        const bearing = map.getBearing() || 0;
        const pitch = map.getPitch() || 0;
        
        // Convert to radians
        const bearingRad = bearing * Math.PI / 180;
        const pitchRad = pitch * Math.PI / 180;
        const tiltXRad = tiltX * Math.PI / 180;
        const tiltYRad = tiltY * Math.PI / 180;
        const tiltZRad = tiltZ * Math.PI / 180;
        
        // Set rotation
        // In Babylon.js, rotation is in radians
        // Y-axis rotation corresponds to map bearing
        mesh.rotation.y = bearingRad + tiltYRad;
        
        // X-axis rotation corresponds to map pitch
        // We negate it because positive pitch in the map means looking down
        mesh.rotation.x = -pitchRad + tiltXRad;
        
        // Z-axis rotation is just the custom tilt
        mesh.rotation.z = tiltZRad;
      } catch (error) {
        console.error('Error updating model rotation:', error);
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
  }, [modelUrl, modelScale, maxScaleFactor, minScaleFactor, showGround, mapCoordinates, mapInstance, tiltX, tiltY, tiltZ]);
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block',
          touchAction: 'none',
          background: 'transparent',
          pointerEvents: 'none'
        }} 
      />
      {link && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
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