'use client';

import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import EmojiPicker from 'emoji-picker-react';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { db } from '../../../../../../utils/dbConfig';
import { Budgets } from '../../../../../../utils/schema';


function CreateBudgets({ refreshData }: { refreshData: () => void; }) {

    const { user } = useUser(); // clerkUser

    const [emoji, setEmoji] = useState('😃'); // emoji state
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false); // toggler state
    const [name, setName] = useState<string | ''>(''); // budget name state
    const [amount, setAmount] = useState<number | null>(null); // budget amount state

    // budget handler (saves/displays)
    const saveBudgetHandler = async () => {
        const result = await db.insert(Budgets)
            .values({
                name: name as string,
                amount: amount,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                emojiIcon: emoji || '😃'
            }).returning({ insertedId: Budgets.id })

        if (result) {
            refreshData();
            toast('Your Budget Has Been Created!');
        }

        console.log({ name, amount, createdBy: user?.primaryEmailAddress?.emailAddress });

    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 rounded-md flex
                     items-center flex-col border-2 border-dashed
                    cursor-pointer hover:shadow-md mt-6 h-[160px]'
                    >
                        <h2>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget4</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Button
                                    size="lg"
                                    className='text-lg'
                                    variant="outline"
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emoji}</Button>
                                <div className='absolute'>
                                    <EmojiPicker
                                        open={openEmojiPicker}
                                        onEmojiClick={(e) => setEmoji(e.emoji)}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <h2 className='text-black font-medium my-1'>Budget Title</h2>
                                    <input
                                        type="text"
                                        placeholder='e.g home'
                                        className='w-full h-[40px] text-center'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                    <input
                                        type="number"
                                        placeholder='e.g 100$'
                                        className='w-full h-[40px] text-center'
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!name && !amount}
                                onClick={saveBudgetHandler}
                                className='mt-5 w-full'>Create Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateBudgets;