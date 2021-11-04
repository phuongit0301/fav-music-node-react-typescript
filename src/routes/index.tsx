import React, { memo, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Loading } from 'src/components';
import App from 'src/pages/App';
import FormCreate from 'src/pages/App/FormCreate';

function Routes() {
	return (
		<div className="max-w-md mx-auto bg-white md:max-w-2xl">
			<BrowserRouter>
				<div className="flex-row">
					<Suspense fallback={<Loading />}>
						<Switch>
							<Route exact path="/" component={App} />
							<Route exact path="/create" component={FormCreate} />
						</Switch>
					</Suspense>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default memo(Routes);