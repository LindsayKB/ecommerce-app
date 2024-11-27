const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch('OEC09RMMYZ', 'be15f375a7184eef835abe476bffce6a');

import {
  refinementList,
  rangeSlider,
  stats,
  toggleRefinement
} from 'instantsearch.js/es/widgets';

const search = instantsearch({
  indexName: 'products',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
  insights: true,
});


search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search for products',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
      <article>
        <div class="img-container"><img src="${hit.image}" alt="${hit.name}"/></div>
        <h3>${components.Highlight({ hit, attribute: 'name' })}</h3>
        <div class="hit-price">$${hit.price}</div>
      </article>
      `,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
  instantsearch.widgets.refinementList({
    container: '#brand-list',
    attribute: 'brand',
  }),
  instantsearch.widgets.refinementList({
    container: '#categories-list',
    attribute: 'categories',
  }),
  instantsearch.widgets.rangeSlider({
    container: '#price-range',
    attribute: 'price',
    min: 10,
    max: 500,
  }),
  instantsearch.widgets.toggleRefinement({
  container: '#toggle-refinement',
  attribute: 'free_shipping',
  on: true,
  off: false,
  templates: {
    labelText({ count }, { html }) {
      return html`<span>Free Shipping</span>`;
    },
  },
}),
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
  }),
  instantsearch.widgets.stats({
  container: '#stats',
  templates: {
    text(data, { html }) {
      let count = '';

      if (data.hasManyResults) {
        count += `${data.nbHits} search results`;
      } else if (data.hasOneResult) {
        count += `1 search result`;
      } else {
        count += `no search results`;
      }

      return html`<span>${count}</span>`;
    },
  },
}),
]);

search.start();
