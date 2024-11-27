'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { user, isSignedIn } = useUser();

    const route = useRouter();

    const getStartedHandler = () => {
        route.push('/sign-in');
    }

    return (
        <div className='p-5 flex justify-between items-center border shadow-sm'>
            <Image
                src={'./logo.svg'}
                alt={'Expenese Tracker'}
                height={150}
                width={150}
            />
            {isSignedIn ?
                <UserButton /> :
                <Button onClick={getStartedHandler}>Get Started</Button>
            }
        </div>
    )
}

