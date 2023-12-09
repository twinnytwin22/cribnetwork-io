'use client';

import Chart from '@/ui/Sections/Analytics/Chart';
import { BarList, Flex, Grid, Metric, Text, Title } from '@tremor/react';

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

const data = [
  {
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

export default function PlaygroundPage() {
  return (
    <div className='bg-white dark:bg-black text-black dark:text-white mt-12'>
    <div className='h-full'>
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6 text-black dark:text-white">
        {data.map((item) => (
          <div key={item.category} className='bg-white dark:bg-black p-4 border border-zinc-300 dark:border-zinc-800 rounded'>
            <Title className='text-black dark:text-white'>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric className='text-black dark:text-white'>{item.stat}</Metric>
              <Text className='text-black dark:text-white'>Total views</Text>
            </Flex>
            <Flex className="mt-6 flex">
              <Text className='text-black dark:text-white'>Pages</Text>
              <Text className="text-right text-black dark:text-white">Views</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2 text-black dark:text-white"
            />
          </div>
        ))}
      </Grid>
      <Chart />
    </div>
    </div>
    </div>
  );
}