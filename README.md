Retrieves the first line of each commit message for a specified pull-request merge

Example:
```yaml
action: Example

on: push

jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - id: merged
        uses: SReject/pr-commit-messages@v1.0.1
        with:
          sha: 31071ffde14c52f5cf90beeb29a24b5812a706f0

      - run: echo "${{ steps.merged.outputs.messages }}"
```

### To build you must install ncc
```
npm install --global --production @vercel/ncc
```

### To run the build process
```
npm run build
```