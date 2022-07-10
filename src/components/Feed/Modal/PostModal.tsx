import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from '@atoms/modalAtom';
import { postListState } from '@atoms/postAtom';
import { Avatar } from '@components/Common';
import { MdClose } from 'react-icons/md';

export const PostModal = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const setModal = useSetRecoilState(modalState);
  const setNewPost = useSetRecoilState(postListState);

  const uploadPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewPost((prev) => [...prev, { text: text, image: image }]);
    closeModal();
  };

  const closeModal = () => setModal(false);

  return (
    <div className='overlay' onClick={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className='rounded-xl bg-white dark:bg-black w-full max-w-lg md:mt-[-22rem] mx-6  dark:text-white/75'
      >
        <div className='flex items-center justify-between border-b border-gray/75 px-4 py-3'>
          <h3 className='text-xl'>Create a post</h3>
          <button onClick={closeModal}>
            <MdClose />
          </button>
        </div>

        <div className='p-4'>
          <div className='flex items-center space-x-2'>
            <Avatar src='' w='30' h='30' />
            <p>name</p>
          </div>
          <form className='mt-3' onSubmit={uploadPost}>
            <textarea
              rows={4}
              placeholder='What do you want to talk about?'
              className='bg-transparent focus:outline-none w-full'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className='flex justify-between'>
              <input
                type='text'
                placeholder='Add a photo URL (optional)'
                className='bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <button
                className='bg-blue-400 hover:bg-blue-500 text-white rounded-full px-3.5 py-1 cursor-pointer disabled:bg-black/30'
                type='submit'
                disabled={!text.trim() && !image.trim()}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};