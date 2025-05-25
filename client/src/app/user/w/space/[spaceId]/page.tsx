


import TaskContainer from '@/components/task-form/TaskContainer';
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page = async({params}:any) => {
  const {spaceId}= await params

  return (
    <div>
      
      <TaskContainer spaceId={spaceId} />
    </div>
  )
}

export default Page


// import TaskContainer from '@/components/task-form/TaskContainer';
// import { Metadata } from 'next';

// type Props = {
//   params: {
//     id: string;
//   };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   return {
//     title: `Task ${params.id}`,
//   };
// }

// const Page = async ({ params }: Props) => {
//   const { id } = params;

//   return (
//     <div>
//       <TaskContainer id={id} />
//     </div>
//   );
// };

// export default Page;
