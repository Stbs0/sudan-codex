import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/utils";
import { PrivateOutletTypes } from "@/types/types";
import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const { data } = useOutletContext<PrivateOutletTypes>();

  return (
    <>
      <div className='px-4 space-y-6 sm:px-6 '>
        <div className='space-y-2'>
          <div className='flex items-center space-x-3'>
            <Avatar className='h-16 w-16'>
              <AvatarImage src={data?.photoURL ?? undefined} />
              <AvatarFallback>
                {getInitials(data?.displayName || "")}
              </AvatarFallback>
            </Avatar>

            <div className='space-y-1'>
              <h1 className='text-2xl font-bold'>{data?.displayName}</h1>
            </div>
          </div>
        </div>
        <div className='space-y-8'>
          <Card className='p-3'>
            <CardContent className='flex flex-col gap-4 '>
              <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  placeholder='E.g. Jane Doe'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  placeholder='E.g. jane@example.com'
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
        <div className='pt-6'>
          <Button>Save</Button>
        </div>
      </div>
    </>
  );
}
