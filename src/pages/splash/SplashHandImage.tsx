import HandImage from "../../assets/images/illustration-hand.png";

export default function SplashHandImage() {
  return (
    <img
      src={HandImage}
      className="absolute pointer-events-none hidden lg:block left-[calc(100%-400px)] 2xl:left-[calc(100%-670px)] bottom-20 z-[1]"
      width="931px"
      height="367px"
      loading="lazy"
      alt=""
    />
  );
}
