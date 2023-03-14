import Head from 'next/head'

export default function Meta({ title, description }: { title: string, description: string }) {
  return (
    <Head>
      <title>{title !== 'UCLA ClubHub' ? `UCLA ClubHub | ${title}` : title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

Meta.defaultProps = {
  title: 'UCLA ClubHub',
  description: "UCLA ClubHub"
}
