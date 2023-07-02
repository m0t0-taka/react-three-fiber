/* eslint-disable react/no-unknown-property */
import "./App.css"
import { Canvas } from "@react-three/fiber"
import { ContactShadows, Float, Html, PresentationControls, Text, useGLTF } from "@react-three/drei"

function App() {

  // リンクのモデルを使用する方法
  // const macbookModel = useGLTF(
  //   "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  // )

  // ダウンロードモデルを使用する方法
  const macbookModel = useGLTF(
    "./macbook.gltf"
  )

  // const iphoneModel = useGLTF(
  //   "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf"
  // )

  const iphoneModel = useGLTF(
    "./iphone.gltf"
  )

  return (
    <div>
      <Canvas camera={{fov: 45, near: 0.1, far: 2000, position: [0, 1.8, 8]}}>
        {/* 背景色 */}
        <color args={["#c4b532"]} attach="background"/>
        {/* 動かせるようにする */}
        {/* <OrbitControls /> */}

        {/* 明かり */}
        <ambientLight />
        {/* 上からのライト */}
        <directionalLight intensity={1.4}/>

        {/* 以下はboxを表示 */}
        {/* <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh> */}

        {/* globalを付けることでモデル以外のところを触った状態でモデルをcontrolできる */}
        <PresentationControls global
        // 動きを制御
        config={{ mass:2, tension:400}}
        // 元の位置に戻す
        snap={{mass:4, tension:200}}
        >
          {/* モデルを浮かせる＋回転させる */}
          <Float rotationIntensity={1.3}>
            {/* 明かり */}
            {/* intensityは光量 */}
            {/* positionのzは手前が+ */}
            <rectAreaLight color={"#7ecdf1"} intensity={50} rotation={[0.1, Math.PI, 0]} width={2.0} height={1.65} position={[0, 0, -1]}/>
            <primitive object={macbookModel.scene} position={[0, -1.5, 0]}>
              {/* macbook画面内に埋め込む */}
              <Html position={[0, 1.56, -1.4]} distanceFactor={1.17} rotation-x={-0.256} transform wrapperClass="htmlScreen">
              <iframe src="https://main.dh6mayboskke8.amplifyapp.com/" frameborder="0"></iframe>
              </Html>
            </primitive>
          </Float>
          <Float rotationIntensity={1.3}>
            {/* 明かり */}
            {/* intensityは光量 */}
            {/* positionのzは手前が+ */}
            <rectAreaLight color={"#7ecdf1"} intensity={50} rotation={[0.1, Math.PI, 0]} width={2.0} height={1.65} position={[0, 0, -1]}/>
            <primitive object={iphoneModel.scene} position={[-2.4, -1.3, 0.2]} scale={[0.6, 0.6, 0.6]}/>
          </Float>

          <Text font="./Nunito-VariableFont_wght.ttf" fontSize={0.6} position={[0, 1.7, 0]}>three</Text>
        </PresentationControls>

        {/* 影 */}
        <ContactShadows scale={7} blur={2.4} opacity={0.5} position-y={-1.8}/>
      </Canvas>
    </div>
  )
}

export default App
