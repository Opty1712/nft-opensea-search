import { memo } from 'react';
import { Container } from '../src/containers';

const Page = memo(() => <Container />);
Page.displayName = nameof(Page);

export default Page;
