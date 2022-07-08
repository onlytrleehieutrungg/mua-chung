# mini-html-parser2

## Install

```
$ npm install @tiki.vn/mini-html-parser2 --save
```

## How to use

```js
// page.js
import parse from '@tiki.vn/mini-html-parser2';

const html = `<div>
<span>test</span>
<div>
    <span>table test</span>
    <table>
        <thead>
            <tr>
                <th>title</th>
                <th>title</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="2">yy</td>
                <td>xx</td>
                <td>xx</td>
                <td>xx</td>
            </tr>
        </tbody>
    </table>
</div>
</div>`

Page({
  data: {
    nodes: [],
  },
  onLoad() {
    parse(html, (err, nodes) => {
      if (!err) {
        this.setData({
          nodes,
        });
      }
    })
  },
})
```

```html
<!-- page.txml -->
<rich-text nodes="{{nodes}}" />
```

## Build and test

```
$ npm run build
$ npm test
```
