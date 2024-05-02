/** @type {Record<string, string>} */
const blurHashes = {
  '/images/1640049434_giphy_480x480.webp':
    'data:image/webp;base64,UklGRtYBAABXRUJQVlA4WAoAAAAIAAAALwAALwAAVlA4IPYAAABwBwCdASowADAAPoU2lEelIyIhONScAKAQiUAYUAgMgTMd64trZax2PUA3dJWaQqUJpF2k2TngYHHrbeM7txK08IIgAAD+sK2wql4Zv56z3QEOAvsXJv82V6NdfGelbeZFKXbm8fjEQNmdHj0eg38yRa01OoK/hd9II2pMkrdXBtLFpMtrKsWLarr7u6WeBiroRnE7P7qwouEkJik/NB1jjfWUmKy/+M05bRmnjlxVHVyjSC26ffLPScm88Kvg50hfncsHr4iyTK/FQeOk/VSZ7BHLyyPCgD0LSGZWyZ+H9v/t1ZdXpRj00zdkWKQpffuExEYAAABFWElGugAAAEV4aWYAAElJKgAIAAAABgASAQMAAQAAAAEAAAAaAQUAAQAAAFYAAAAbAQUAAQAAAF4AAAAoAQMAAQAAAAIAAAATAgMAAQAAAAEAAABphwQAAQAAAGYAAAAAAAAAOGMAAOgDAAA4YwAA6AMAAAYAAJAHAAQAAAAwMjEwAZEHAAQAAAABAgMAAKAHAAQAAAAwMTAwAaADAAEAAAD//wAAAqAEAAEAAAAwAAAAA6AEAAEAAAAwAAAAAAAAAA==',
  '/images/2d2cecbb109c538689e71394efe2d804_480x480.webp':
    'data:image/webp;base64,UklGRgACAABXRUJQVlA4WAoAAAAIAAAALwAALwAAVlA4ICABAADQCACdASowADAAPpFEmEolo6IhpypIsBIJQBkZbICS/epLmFOUd/Go1F3IvDcTqv1f+vfupnVwEQJrXJEWsqdTFYgoWEVQm0ICiAz9IIKAAP7+lGPIVMOj/Bkr6okimV/rDYLddF5oXRNfDfTgqu9vDrxJJiPrZ71IsTvlW/PZXcPQLib5QrW0+5oO7oXs/U4OoJOUuP4Kl+R9AaoW16JCwlRFfNMTh8KCG/NMk9Q+xdmdP0uOYAHRwStbj1qz18P+7FQ0QsqyO7o7GTTnzuqf1a3fIOJG9oELa45tVyKJclF5ZDx13J62hbw2YJulG9zD7ew0RC50nuXI0p8lbU3YfpAzwxTeqtnOcIYVLnzxJgaf7BI5dqe02AxWh9VMAABFWElGugAAAEV4aWYAAElJKgAIAAAABgASAQMAAQAAAAEAAAAaAQUAAQAAAFYAAAAbAQUAAQAAAF4AAAAoAQMAAQAAAAIAAAATAgMAAQAAAAEAAABphwQAAQAAAGYAAAAAAAAAOGMAAOgDAAA4YwAA6AMAAAYAAJAHAAQAAAAwMjEwAZEHAAQAAAABAgMAAKAHAAQAAAAwMTAwAaADAAEAAAD//wAAAqAEAAEAAAAwAAAAA6AEAAEAAAAwAAAAAAAAAA==',
  '/images/679493a2b51cda300edb28d7d078267a_500x281.webp':
    'data:image/webp;base64,UklGRmAEAABXRUJQVlA4WAoAAAAMAAAAMQAAGwAAVlA4IG4AAADQBQCdASoyABwAPoE0kkelIyGhM+qooBAJaQAAjmRMpb5FwDsh5p5xG6zbPBZ0f3Kh2MzMxLoAAP76H6MnEvNVJvlak+syqToADb7joWXNF5C1VYdj64o9LgZdLwMx8XEMSkcMcGXIWbrSGAAAAEVYSUa6AAAARXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAA4YwAA6AMAADhjAADoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAADIAAAADoAQAAQAAABwAAAAAAAAAWE1QIAoDAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NjRFMjY2NkE3RkExMUUyOTVGRUQ3NTk5ODQzMjc3MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NjRFMjY2N0E3RkExMUUyOTVGRUQ3NTk5ODQzMjc3MSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2NEUyNjY0QTdGQTExRTI5NUZFRDc1OTk4NDMyNzcxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk2NEUyNjY1QTdGQTExRTI5NUZFRDc1OTk4NDMyNzcxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+',
  '/images/7c94d5a7bdb514d0b1e801f997a5d9f5_1200x1000.webp':
    'data:image/webp;base64,UklGRlADAABXRUJQVlA4WAoAAAAIAAAAdwAAYwAAVlA4IHACAABQFQCdASp4AGQAPpFCnEklpCMhK3c5yLASCUAakAwFz/huHxJTD13ADiSD2nPu4jrTE/b1TAePSAi7nLY7F7FH/dFNNjHDZjslob8E4Cp3VDCLjmFJsdyuD/ieL41CTXAZ0awOKk9p0+jTqBkpcnLjdSveHdVu7nxeQwPbMyaI3SftTT/IWOX6VoG5ItYrTk+mBJWirvlcsE7x4m0WLaWJ/V/sL8E0ypv77Z+t8TrhlrM9GAD+9eTnweoX9IEj0Wmu3mgTLwhz+K1pM6JLrQHA2FFtShjrtM6Uqyls1bguD9fa1hxdWYdNHuP9yzIihxVzgmnTn0uBTCW4Ws1a4KT1Nv79zkrn9Qf6q8dU8XuUcSUzlUxRbO+4rw2kdWRe6MrFBSX/yhLVNJW5ocKueOWF2D5QdRNRdY7wo/uTow3i3+XOieYAeAVhmksMMYidCsylKVQ9/Dl5ZU4elw5vDTqavm6phTUEbdFvDizOEhYuYRlf7YTTjtkg3msL1v2qBrhAGMsCoEdvIXGSoePx91ZIc7a83E2HonCYneNZITyP7ZK9IH0V6mY7+Ylf7E9c2zLN33tOIO9CMkIOdKBoKFAGSDkg7d4Q2HiSWZSWs2vC1dNK8B0YbDTaCRJ5EBfw9DTxJ5MLHWgsxBYGXdX+YHzPKYgrHJkwxO3coF7kNGnBdOschV2Jjj0oVa553PxxOwhn/sj27bkSuV059OjBm560dz8tskvrv4xb/zdyYw8ahh6l0JaSqNfC5ByJE8JWxHftLy5Hp2OUhttsXkmaVMV42SOcJwPwmAqypp6C5Ovx8VOyzg/jEXB28QigAAAAAABFWElGugAAAEV4aWYAAElJKgAIAAAABgASAQMAAQAAAAEAAAAaAQUAAQAAAFYAAAAbAQUAAQAAAF4AAAAoAQMAAQAAAAIAAAATAgMAAQAAAAEAAABphwQAAQAAAGYAAAAAAAAAOGMAAOgDAAA4YwAA6AMAAAYAAJAHAAQAAAAwMjEwAZEHAAQAAAABAgMAAKAHAAQAAAAwMTAwAaADAAEAAAD//wAAAqAEAAEAAAB4AAAAA6AEAAEAAABkAAAAAAAAAA==',
  '/images/e4238c2f183527e388a814e9feeb105c_1200x1000.webp':
    'data:image/webp;base64,UklGRpgDAABXRUJQVlA4WAoAAAAYAAAAdwAAYwAAQUxQSCcAAAABJ0CQbePPvO3XiIj4AhiGoCiFFFJIIX+xfd9cRP9T7//9MRq06FAAVlA4IIgCAACQFACdASp4AGQAPpFAm0klo6KhKTr6ALASCUWlIHC5oRf/5Dh8TSQ2dwiBjB+qBFYB2/gp7lwR3EngDsXqSEWJulGkzGMtTpRqhpM7VFTBn0F8K3cV+BUuN+kxeUBqEIRzO2qgESO3xgzuwlt3VjybB83tZpV1g208dF/zTKaKJAXZPPBSkmMnNJ7WFOH7I3+f5RHEXAZZQK5FZucO76WQMs0IJYsIKkCICxjGAAD+9eRBcX/ZEuytAFnfv/QqE6nmft+0QjV9kX32Ai24vVM+K+gkRs7MO3Gv8PMJJXiYJPZMU18V7+oHQMRCS3ju1/bep2478y0qr0lFLW6FadL7ll/B/+u7qStK4hLN4iuFKMxkSoRXxmHVL58pdGg7R250Mkar09Qx+CYR5hSntrlm6hBfDB1L53Aw3V6PgwCcHunnhyaJJaqxwBQfGyGgUgxcSYyzoLTRgdQz0QdxpwTT0/GZjlUt+wAQgkt6NTDYSHxXn2R0x+gUGPnlVyI9spcIsZOfAOGkEaTMcYNhkaiASCp8zMMsQO7Jz1ltzRhYQye/dv9MuYgSyqmged6BnU371/NipusOZaEy2Eqjh95Vh3m8/dqY1+LgxRSSnmOnKvywvtchE+O+6ZoUohW3TShgdQGV7j0uIu5QYqg7Ka2WgGe7XH3++6i/theXHbUrcOXeyIlI8XKIQTse5i8e/3sbRov2loF41klmHeXf8nGW7QQ3OHttaArONEI6eFXhwkZLtJsbHyctJ40QNWHA5vHUwTL3+LoMKgdZDHkgr/S+Y8nDn8jlmNyCaUfoDHWQUSNXp+7eBrBEye11L6TfnuMiNSmOcf/bQ2fBUIkP9l4P0AAAAAAAAABFWElGugAAAEV4aWYAAElJKgAIAAAABgASAQMAAQAAAAEAAAAaAQUAAQAAAFYAAAAbAQUAAQAAAF4AAAAoAQMAAQAAAAIAAAATAgMAAQAAAAEAAABphwQAAQAAAGYAAAAAAAAAOGMAAOgDAAA4YwAA6AMAAAYAAJAHAAQAAAAwMjEwAZEHAAQAAAABAgMAAKAHAAQAAAAwMTAwAaADAAEAAAD//wAAAqAEAAEAAAB4AAAAA6AEAAEAAABkAAAAAAAAAA==',
  '/images/f4a6519b84d8d5c0f5f85c6207d9e20c_1200x1000.webp':
    'data:image/webp;base64,UklGRhQDAABXRUJQVlA4WAoAAAAIAAAAdwAAYwAAVlA4IDQCAACwEwCdASp4AGQAPpFCnUklpCMhKJmaILASCWMA1XAhr5/D8DqW6Fbt8fMlTOGQ7B7KQ5L3cfOL4bGer3cxqz5xtmTsXxq9KZTjwC9KdbaPdIh/TqGiJ6TzdxnGCKI25f1zrZa1IN8AIsEjibLeIY3cOxMiMJg4HYWv+ZkO09/YfHgT5MdIHfGnCYGm6rXOQBq0hIskdYSSCZwgyx851wJimWH3fWjAAP71JfTPYK/pc8JTocEL++EQtxBGbw6lvEw/DXHQ/GhcM8Rv+MeCXYPQN37EaBCB9EVR1U3w05Di3a+pJGYfm16fvYH3DwUHHggryPvmx27o3jUi6cQZV+5McAStt8/PLsLYA2PkmlxyqfaaPJEnvWUeQvVR/zcDVRV3Zx0ngmbmOjEI5+u6PU8Hz08skC33SEN7wlP00KvWeoBWOt5VcviAz8ChVrZzvcji9ltbktcvrU/ufFpIRD9EvSjV8xhiWU85N/VDTqR4xfAL+uC4Nl7loCLB5fHfzPW1hEBfX7BeUbP+r4z+DhVzLoeR+0Ekf0uNDD3wid+RDIzPM6lDBzUiJYFGEvhS1gXDH9YgHHl9J5MIPQsb3NgQUTyqettiSHY6DyYBd4V5Uu9cw79UXbD+2vtrzTw0i1G5SMjWMQptT/yWdOcc+2Pz560eD+U5SvJHoUZ+d07zcBLx0phkb0JxtHEpgOx3wdU0M3t9dpesLppz8kNEpeRKm4TS8039ZeLtqN9UUvAAAAAAAABFWElGugAAAEV4aWYAAElJKgAIAAAABgASAQMAAQAAAAEAAAAaAQUAAQAAAFYAAAAbAQUAAQAAAF4AAAAoAQMAAQAAAAIAAAATAgMAAQAAAAEAAABphwQAAQAAAGYAAAAAAAAAOGMAAOgDAAA4YwAA6AMAAAYAAJAHAAQAAAAwMjEwAZEHAAQAAAABAgMAAKAHAAQAAAAwMTAwAaADAAEAAAD//wAAAqAEAAEAAAB4AAAAA6AEAAEAAABkAAAAAAAAAA==',
  '/featured/default_cover_1349x500.webp':
    'data:image/webp;base64,UklGRgACAABXRUJQVlA4WAoAAAAIAAAAhgAAMQAAVlA4ICABAAAQCwCdASqHADIAPpFCnkqlo6MhqBHJeLASCWcA0aG/xvyAEx2EDAyIx83IAL44lo2q6S9VfdgGomvbMjymlWqFpRVfsqE81eCuJ4GE38g60LPKLPp8sqxhb5m3Z8LZeISAANY3KTmnndD/tT8rPd9MJ//kGP9DX+Cuecoth5Mbk2ZDtCPDnm7gbmr9fWm33cl9YcgIF38/lh2ZYxJw1o0RengPuoNJ3dF2OnSEg2SrM1gIvDxnpHfu7b6Iy14oDT9rnlAhNHQuP32YIQqBH0lQIyO1CwCkIFDFFXzwP2AfC0EH6XJRe9nuFYfS5bHpFN324WMbBFuP+88X4M3kjUSgI9YqDkJZIb5M+iGeyTEDdiRJFjcOAE+RevSoAAAAAABFWElGugAAAEV4aWYAAElJKgAIAAAABgASAQMAAQAAAAEAAAAaAQUAAQAAAFYAAAAbAQUAAQAAAF4AAAAoAQMAAQAAAAIAAAATAgMAAQAAAAEAAABphwQAAQAAAGYAAAAAAAAAOGMAAOgDAAA4YwAA6AMAAAYAAJAHAAQAAAAwMjEwAZEHAAQAAAABAgMAAKAHAAQAAAAwMTAwAaADAAEAAAD//wAAAqAEAAEAAACHAAAAA6AEAAEAAAAyAAAAAAAAAA==',
  '/featured/functions-functional-js_1080x627.webp':
    'data:image/webp;base64,UklGRhYCAABXRUJQVlA4WAoAAAAIAAAAawAAPgAAVlA4IDYBAABwCgCdASpsAD8APo0+lkeno6ohLtYtUUARiWcAzJdT2Nz5ZKCHg8BDVwFA6e4LuVAXyKygAzkPDngoDPwrRVDrRLqLQUzmf8kybPcOEBR9tv4iVI+k58YNiPFpIAD+9GV3ehGIaHUsMecuS3Ixwh6hu98K4DDdGhI5M3IZKBbasqNElzB8fL6yXzBXHakSgSyFnco14z8O5c5YuOw+Gmlek541eww6eTlMdYi2uugceR2IwtcGcu6i6d/rZWkPyse49rbFSn/bSTaGuldVG1tG/Wub0ReWjC3tvI4XlBoVE5mT0AWGdCnrQShmGZHsuxFa0GHB6B2p7F9/5OEkQzg4sv5Hl8LWX8vCXW3dNa8qBSZXeY0SI4r9eJ4u64wNUNh2aASwkWeVoefnNXxzByVVyzUAAAAARVhJRroAAABFeGlmAABJSSoACAAAAAYAEgEDAAEAAAABAAAAGgEFAAEAAABWAAAAGwEFAAEAAABeAAAAKAEDAAEAAAACAAAAEwIDAAEAAAABAAAAaYcEAAEAAABmAAAAAAAAADhjAADoAwAAOGMAAOgDAAAGAACQBwAEAAAAMDIxMAGRBwAEAAAAAQIDAACgBwAEAAAAMDEwMAGgAwABAAAA//8AAAKgBAABAAAAbAAAAAOgBAABAAAAPwAAAAAAAAA=',
  '/featured/hello-blog-again_1080x720.webp':
    'data:image/webp;base64,UklGRoYDAABXRUJQVlA4WAoAAAAIAAAAawAARwAAVlA4IKYCAADwFwCdASpsAEgAPnUykEekoyGhO3iOYJAOiWcAyCNMqZCYS33Zl/IlDMGUcMaB+GjNH6xkw3VC5dwmHj7UHVVKNI2YI8pK41m4Gfe5IhhAyW/U/N+qcB11CutzevclXdG65krresAeuITo6IwxodqLE7rMMZ19hl2ICIweV5rZ7D58XjuZa6tlVZTPYJI4SCHCd11xR+aIjKsZpJTVj5ddxuIgJWOn49p4vSWNBMFX2m/n1ptk3vMdyDsxSvvr3EmJHyYs1Lv+AAD+x9wIFaPBXeu97loo5e8xFGzSS9d4x3ajkN+fQhpzvmmpD5iD5JvxYR8eD7efiIH7EbbrSed5eap4OGbUurOSLfTK+KI5X5AIxPhBKiW6V9f71PfiPnpsSbpcIaobGKCaYZ/8VpPwzjc5iKwVArTdzApS6Dy1oU1aV1Hf9RtGPGYlR4HuzWHBAbXWZEpVKZOeFuQzEniOX+P12/cUpBkzSqQZw8n8iBHSH+au1LKiW04/bb9I7QdKDZ4W3bcqerGmnKNENEGuqRBzl1hv0Q2iC3XDqVg5JwY0dKxpblQModwBk0P2tG+/GN1PDtN5BeqIKW+j5noFLLSarTuAcbWNFRoPKg8BY7oXery43rBIdDi/7X/Oqn6kAHI6ZAmpB8HBLj5gfL1s256uSX8PVLwauZq3aKk3hiHxsYvtRLTjL5oPOcSFzqf4EzaWVh0MA/dwYY4A/uhVWrKeHrBMQrYCpXXvQDbWD5Caz+jucTJB67y43KqRYe0hOA7YFI5XTq/DSUxnVeK1GglEp6GntmJbxch4fzTWytql2CMMs9k8NWqTtsw0eUsZHT++j95VtlGWJ9076bTKHFCl0xM8KYFYDYHPXHesmiV1SJPsPDZ3KAy9B6Fil09XgPEPwABFWElGugAAAEV4aWYAAElJKgAIAAAABgASAQMAAQAAAAEAAAAaAQUAAQAAAFYAAAAbAQUAAQAAAF4AAAAoAQMAAQAAAAIAAAATAgMAAQAAAAEAAABphwQAAQAAAGYAAAAAAAAAOGMAAOgDAAA4YwAA6AMAAAYAAJAHAAQAAAAwMjEwAZEHAAQAAAABAgMAAKAHAAQAAAAwMTAwAaADAAEAAAD//wAAAqAEAAEAAABsAAAAA6AEAAEAAABIAAAAAAAAAA==',
  '/featured/higher-order-functions-functional-js_1080x608.webp':
    'data:image/webp;base64,UklGRkoCAABXRUJQVlA4WAoAAAAIAAAAawAAPAAAVlA4IGoBAACwDACdASpsAD0APo02lkelIqIhMByLaKARiWcAyntQGb47iyGHFKhMfmyO8FhZxfCuf2zfqvumFjichDJaBExSIq3yX1RhrW+Zjhi+Z0IYAENKHtCfRuFd8lJS2c3rwA4BAG55+PfbPaXjarmYQAD+94suGgNYEqPSuV+RNOIGQNkCuHJBzRTOXxIaNqlFAKRO31BtfyxyduyvPbJpATr7PQw2liJvPhLXJvmvehfAU76XW4BipY3OwzmrpT+jJiO3+CRWwQwFIKDjn5xoFIrrf2paGtw/lny/jwQdWwfmmnVIDOj99D6dKVN5twJc06lHZK5Kb18Sxn58KtID3sCMzgXo2b/CVVJ3bcDhtckhtXGHrYxHpNjeylRYCgOI3hr32R8jDYYJa8BwzqAaV/tbUlgtjilxH7GVvOW2ITzSKkllS+g+vUnH6JmYcD4awog6l5PdJpv5gakl2xPIZ6+rex3uhpYiIBqgAEVYSUa6AAAARXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAA4YwAA6AMAADhjAADoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAGwAAAADoAQAAQAAAD0AAAAAAAAA',
  '/featured/intro-functional-js_1000x420.webp':
    'data:image/webp;base64,UklGRjwCAABXRUJQVlA4WAoAAAAIAAAAYwAAKQAAVlA4IFwBAADwCQCdASpkACoAPo08mEelI6KhMllYAKARiWIA0qAQfEX/gQ7UzUerjUz7Jr/6Gt0LrjFMko5LzFzMFSewzFp8OBmtldxuHO43AZQnhltjKVhWLSVJtBIAAP7yiH//3wJ/3gT/vAn+8X/tQxmOeLeWm3W3a9/Es9IY4k9v1HbWf/lrXGBvKTP/3/HKzbDXHTnB/e9+3krcPI7M9TtkIiCEQ5F7nxKzta2wi6CIsEM9n9bnXIjhg2Eta2/7rxC/RQZPNjiq6t2ddXdWyeZLWpML6yKvg+z/BU2FIh5SrmYhIGjr3Nr/tE97sP+f4/zKINl3VLUUpRoGrCYmZmIB7ePQAAQZcFnF8v4skb/6tX5W/5p/z4NfTBm/Z17zhIbqolxNf01B39yCJU/mJ5rym3YHp1uT9S/Y/vpAd7VsZZdhmk1Fnr+9hWzArC8lxWSDEsE4N+nuz2vrX2gAAABFWElGugAAAEV4aWYAAElJKgAIAAAABgASAQMAAQAAAAEAAAAaAQUAAQAAAFYAAAAbAQUAAQAAAF4AAAAoAQMAAQAAAAIAAAATAgMAAQAAAAEAAABphwQAAQAAAGYAAAAAAAAAOGMAAOgDAAA4YwAA6AMAAAYAAJAHAAQAAAAwMjEwAZEHAAQAAAABAgMAAKAHAAQAAAAwMTAwAaADAAEAAAD//wAAAqAEAAEAAABkAAAAA6AEAAEAAAAqAAAAAAAAAA==',
  '/featured/trials-tribulations-functional-js_940x608.webp':
    'data:image/webp;base64,UklGRmQCAABXRUJQVlA4WAoAAAAIAAAAXQAAPAAAVlA4IIQBAABwEACdASpeAD0APpE8l0ivoyIhLBVdUfASCWU7gB4Xnozj4oL3DT3BkDfsGr9NK3/4pjPVybC/ijeDB1JuPqGHr8KyGw0l+7LyYUN1nh899KoFtRUaL7IjYIgYQf1fhojSUVWwkvWuBNjszoimzi4e7by+yobLzUU83PXIr+lTvaxH+rKS9DCzWbu6pAD+9lBQiV6liB55F2KEHKKVTk0yeB8Pd0vlZL6kzynN+jKAhWG31TzaVlcjykA+LC/Eq3HIMhaseOfSiXWkeCoqQR6o08rdgZpGEBcut3kmDJZQL/XpVk7VXM2Vh06aWTyaqdPwOB5kYByZ7f+g4hHyvApWQFjVM52YniRiez2UKadc52T0PMDoiCSCEJOXHO+rjm+Trr4F45BFbjCsRYw9rF9jyAkYLg+A/lRP4Cpp3A1QXSm875Mh+nK+kTKhWqdGnCwGQlKynMsoiVphLz4xH7IZsvvN48cv1aEVM2aZGDvDTOXgrK/osoU6mcB4gGzfa6RhrIAARVhJRroAAABFeGlmAABJSSoACAAAAAYAEgEDAAEAAAABAAAAGgEFAAEAAABWAAAAGwEFAAEAAABeAAAAKAEDAAEAAAACAAAAEwIDAAEAAAABAAAAaYcEAAEAAABmAAAAAAAAADhjAADoAwAAOGMAAOgDAAAGAACQBwAEAAAAMDIxMAGRBwAEAAAAAQIDAACgBwAEAAAAMDEwMAGgAwABAAAA//8AAAKgBAABAAAAXgAAAAOgBAABAAAAPQAAAAAAAAA='
}

export default blurHashes
