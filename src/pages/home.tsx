import Head from 'next/head'
import Layout from '../components/layout'
import { VideoItem } from '../components/logic/Videos'
import Categories from 'components/Categories'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SwipeableDrawer } from '@mui/material'
import VideoSection from 'components/VideoSection'
import Link from 'next/link'
import { VideoProperties, getVideoProperties } from 'utils/video'
import { GetStaticPropsContext } from 'next'
import axios, { Axios } from 'axios'

interface HomeProps {
  videos: {
    metadataCid: string
    video: VideoProperties
  }[]
}

export default function Home({ videos }: HomeProps) {
  const router = useRouter()

  const [currentVideoProperties, setCurrentVideoProperties] = useState<any>(
    null,
  )

  useEffect(() => {
    if (router.asPath === '/home') {
      setCurrentVideoProperties(null)
    }
  }, [router.asPath])

  const openVideo = (cid: string) => {
    router.push(
      {
        pathname: '/watch/' + cid,
      },
      undefined,
      { shallow: true },
    )
    setCurrentVideoProperties(
      videos.find(({ metadataCid }) => metadataCid === cid),
    )
  }

  const closeVideo = () => {
    setCurrentVideoProperties(null)
    router.push(
      {
        pathname: '/home',
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <>
      <Head>
        <title>SeaTube</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="">
          <div
            className="sticky bg-gray-50 z-20 mb-4"
            style={{
              top: 56, // Navbar height,
            }}
          >
            <Categories
              categories={[
                'All',
                'Crypto',
                'Music',
                'Tech',
                'Art',
                'Sports',
                'News',
                'Humor',
                'Science',
                'Education',
                'Politics',
                'Entertainment',
                'Travel',
                'Food',
                'Games',
                'Other',
              ]}
              defaultValue="All"
            />
          </div>

          {/* Desktop */}
          <ul
            role="list"
            className="hidden sm:grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 grid-rows-2 max-w-[2480px]"
          >
            {[...videos, ...videos].map((props, id) => (
              <li key={id}>
                <Link href={`/watch/${props.metadataCid}`}>
                  <a>
                    <VideoItem properties={props.video} thumbs="/thumbs.png" />
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile */}
          <ul role="list" className="grid sm:hidden grid-cols-1 gap-4">
            {videos.map((props, id) => (
              <li key={id}>
                <VideoItem
                  properties={props.video}
                  thumbs="/thumbs.png"
                  onClick={() => openVideo(props.metadataCid)}
                />
              </li>
            ))}
          </ul>
        </div>
      </Layout>
      <SwipeableDrawer
        anchor="bottom"
        open={currentVideoProperties}
        onClose={() => closeVideo()}
        onOpen={null}
        hysteresis={0.8}
        transitionDuration={450}
      >
        {currentVideoProperties && (
          <VideoSection
            video={currentVideoProperties.video}
            metadataCid={currentVideoProperties.metadataCid}
          />
        )}
      </SwipeableDrawer>
    </>
  )
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
   
    const host = process.env.NEXT_PUBLIC_VERCEL_URL ? 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL : 'http://localhost:3000'
    
    const videos = await fetch(host + '/api/videos').then(res => res.json())

    return {
      props: {
        videos,
      },
    }
  } catch (e) {
    console.error('error', e)
    return {
      notFound: true,
    }
  }
}
