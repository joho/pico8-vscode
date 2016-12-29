# pico8-vscode

A new vscode extension for editing and running pico8 files.

I recommend having a separate pico8 workspace for doing dev in. I keep mine at `~/Projects/pico8` and 
it looks a bit like this

```
pico8
├── backup
├── bbs
├── carts
│   └── hello.p8
├── cdata
├── config.txt
├── cstore
├── log.txt
└── sdl_controllers.txt
```

This then allows me to open the workspace from the command line like

```sh
joho6[19:22:03]:~/Projects/pico8
👻  code .
```

The benefit of this is that any edits and saves you make within pico8 (for example doing graphics or sound)
will be written back into the workspace where you would expect it, rather than into the default home
which is likely to be far, far away from the warm embrace of source control

## Features

* Syntax highlighting for *.p8 files
* If used in workspace mode will set the pico8 home to your workspace
* CMD+R to open automatically run the .p8 you're editing in pico8
* A humane licence (no twitter egg anti-sjw MIT variant here)

## Requirements

You need to have pico8.

## Extension Settings

This extension contributes the following settings:

* `pico8.executablePath`: path to where your pico8 actually is (default is `/Applications/PICO-8.app/Contents/MacOS/pico8`)

## Known Issues

Best I can say is that it "works on my machine"

It's not yet published to the vscode marketplace

## Release Notes

### 0.0.1

Initial release of pico8-vscode

## License

All code is by John Barton and [MIT licensed](/LICENSE.md) with the exception of the syntaxes folder which is covered by [the original author's license](/syntaxes/OSSREADME.json)