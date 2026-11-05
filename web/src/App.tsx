import { GameShell, GameTopbar } from "@freegamestore/games";
import { useRef, useEffect } from "react";
// Deep imports, not the "@babylonjs/core" barrel: the barrel pulls in the whole
// engine (~1.6 MB gzipped, over the 600 KB 3D bundle limit). Import each class
// from its own module so only what the game uses is bundled.
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder";
import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { Scene } from "@babylonjs/core/scene";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    new ArcRotateCamera("cam", -Math.PI / 2, Math.PI / 3, 10, Vector3.Zero(), scene);
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    CreateBox("box", { size: 2 }, scene);
    const ground = CreateGround("ground", { width: 10, height: 10 }, scene);
    const mat = new StandardMaterial("groundMat", scene);
    mat.diffuseColor = new Color3(0.2, 0.2, 0.25);
    ground.material = mat;

    scene.clearColor = new Color4(0.06, 0.09, 0.16, 1);

    engine.runRenderLoop(() => scene.render());
    const onResize = () => engine.resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      engine.dispose();
    };
  }, []);

  return (
    <GameShell topbar={<GameTopbar title="APPNAME" showScore={false} />}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </GameShell>
  );
}
