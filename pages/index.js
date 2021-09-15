import { Game, ClientOnly } from '../components/'
import client from '../apollo-client'
import { useEffect } from 'react'
import { gql } from '@apollo/client'
import { useStore } from '../hooks/useStore'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'

const QUERY = gql`
  query MyQuery {
    user {
      uid
      pos
    }
  }
`
export default function Home({ user, created }) {
  const uid = useStore((state) => state.uid)
  const setUid = useStore((state) => state.setUid)
  const router = useRouter()

  useEffect(() => {
    if (created) return
    if (!user.find((x) => x.uid === uid)) {
      router.push({
        query: { uid: nanoid() }
      })
    }
  }, [user, uid])

  useEffect(() => {
    if (created) {
      setUid(router.query.uid)
    }
  }, [created])

  return (
    <ClientOnly>
      <Game />
    </ClientOnly>
  )
}

export async function getServerSideProps({ query: { uid } }) {
  const {
    data: { user }
  } = await client.query({
    query: QUERY
  })

  let res
  try {
    res = await client.mutate({
      mutation: gql`
        mutation MyMutation($uid: String!) {
          insert_user(objects: { uid: $uid }) {
            affected_rows
          }
        }
      `,
      variables: {
        uid
      }
    })
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      user,
      created: !!res
    }
  }
}
