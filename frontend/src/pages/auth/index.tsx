import AuthHeroImg from "@/assets/AuthImg.png";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUp from "./sign-up";
import LoginForm from "./log-in-form";

export default function Auth() {
  return (
    <section className="flex h-[100vh] w-[100vw] items-center justify-center">
      <div className="grid h-[80vh] w-[80vw] rounded-3xl border-2 bg-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] xl:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center -space-x-4 text-5xl font-bold">
              <h1>Welcome</h1>
              <img src={Victory} alt="Victory emoji" className="h-[100px]" />
            </div>
            <p className="text-center font-medium xl:px-5">
              Fill in the details to get started with the best chat app
            </p>
          </div>
          <div className="flex w-full items-center justify-center">
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className="w-full rounded-none bg-transparent">
                <TabsTrigger
                  className="w-full rounded-none border-b-2 p-3 text-black text-opacity-90 transition-all duration-300 data-[state=active]:border-b-purple-500 data-[state=active]:bg-transparent data-[state=active]:font-semibold"
                  value="login"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="w-full rounded-none border-b-2 p-3 text-black text-opacity-90 transition-all duration-300 data-[state=active]:border-b-purple-500 data-[state=active]:bg-transparent data-[state=active]:font-semibold"
                  value="signup"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent defaultChecked={true} value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup">
                <SignUp />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex">
          <img src={AuthHeroImg} alt="banner image" className="" />
        </div>
      </div>
    </section>
  );
}
