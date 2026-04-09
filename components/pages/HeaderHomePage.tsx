
import Image from 'next/image'
import { Card, CardContent } from '../ui/card'

const HeaderHomePage = () => {
  return (
    <div className='flex items-center justify-between'>
        <Card className='py-2 px-4 w-fit border-transparent shadow-md'>
            <CardContent className='flex items-center justify-center space-x-3 p-0'>
                <Image src={'https://res.cloudinary.com/dls9vpbow/image/upload/v1774664038/carlodo_chat/avatars/q62lyrppsxzvbrpg1azz.jpg'} 
                alt='avatar' width={50} height={50} className='rounded-full size-10 sm:size-14'/>
                <div className='space-y-'>
                    <h3 className='text-sm sm:text-md text-muted-foreground'>Xin chào!</h3>
                    <span className='font-bold text-md sm:text-xl capitalize'>Phan ngọc như thanh</span>
                </div>
            </CardContent>
        </Card>
    </div>
    
  )
}

export default HeaderHomePage