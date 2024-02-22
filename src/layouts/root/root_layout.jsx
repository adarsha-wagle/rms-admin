import React, { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import ShowLoader from 'src/components/ui/show_loader';

function RootLayout() {
  return (
    <Suspense fallback={<ShowLoader />}>
      <Outlet />
    </Suspense>
  );
}
export default RootLayout;
