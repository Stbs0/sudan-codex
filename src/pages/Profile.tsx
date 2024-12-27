import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils";

export default function Profile() {
  // const { user } = useOutletContext<PrivateOutletTypes>();
  const { user } = useAuth();
  console.log(user);
  return (
    <main>
      <form>
        <div className='space-y-6 px-4 sm:px-6'>
          <div className='space-y-2'>
            <div className='flex items-center space-x-3'>
              <Avatar className='h-16 w-16'>
                <AvatarImage
                  src={user?.photoURL || ""}
                  alt='profile'
                />
                <AvatarFallback>
                  {getInitials(user?.displayName || "")}
                </AvatarFallback>
              </Avatar>

              <div className='space-y-1'>
                <h1 className='text-2xl font-bold dark:text-gray-100'>
                  {user?.displayName}
                </h1>
              </div>
            </div>
          </div>
          <div className='space-y-8'>
            <Card className='p-3'>
              <CardContent className='flex flex-col gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    id='name'
                    placeholder={user?.displayName as string}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    placeholder={user?.email as string}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Biography</Label>
                  <Textarea
                    id='bio'
                    placeholder='Enter your bio'
                    className='mt-1'
                    style={{ minHeight: "100px" }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className='p-3'>
              <CardHeader>
                <div>Change Password</div>
                <div>
                  For your security, please do not share your password with
                  others.
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='current-password'>Current Password</Label>
                  <Input
                    type='password'
                    id='current-password'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='new-password'>New Password</Label>
                  <Input
                    type='password'
                    id='new-password'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='confirm-password'>Confirm Password</Label>
                  <Input
                    type='password'
                    id='confirm-password'
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='flex justify-center'>
            <Button className=''>Save</Button>
          </div>
        </div>
      </form>
    </main>
  );
}
