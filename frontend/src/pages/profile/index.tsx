import useStore from "@/zustand/store/store";

type Props = {};

export default function Profile({}: Props) {
  const { userInfo } = useStore();
  console.log("pro=>", userInfo);
  return <div>profile</div>;
}
