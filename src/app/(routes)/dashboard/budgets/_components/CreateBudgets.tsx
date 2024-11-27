'use client';
import React, { useState } from 'react'
import {
    Dialog, DialogClose, DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import EmojiPicker from 'emoji-picker-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';


function CreateBudgets() {

    const { user } = useUser();

    const [emoji, setEmoji] = useState('😃');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState<number | null>(null);

    const saveBudgetHandler = async () => {
        if (!user) {
            toast.error("Please log in to create a budget");
            return;
        }

        const budgetObj = {
            name,
            amount,
            emoji,
            userId: user.id,
            createdAt: new Date().toLocaleDateString(),
        };
        try {
            const docRef = await addDoc(collection(db, "budgets"), budgetObj);
            console.log("Budget saved with ID:", docRef.id);

            setName('');
            setAmount(null);
            setEmoji('😃');
            setOpenEmojiPicker(false);

            if (docRef) {
                toast('Your Budget Has Been Saved!');
            }
        } catch (error) {
            console.error("Error adding document: ", error);
        }

    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 rounded-md flex
                     items-center flex-col border-2 border-dashed
                    cursor-pointer hover:shadow-md'
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
                                <Button
                                    disabled={!name && !amount}
                                    onClick={saveBudgetHandler}
                                    className='mt-5 w-full'>Create Budget</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateBudgets;