import { readFileSync, watch, writeFileSync, WatchEventType } from 'fs'
import { join } from 'path'
import { mainWindow } from './index'
import { IpcEvents } from '@mable-electron/core'
import { dataDir } from './util'
import { ipcMain } from 'electron'
import log from 'electron-log/main'

export const quickCssPath = join(dataDir, 'quickCSS.css')

export function startQuickCSSWatch(): void {
  log.info('Starting quickcss')
  writeFileSync(quickCssPath, "/* Fallback value for padding to avoid window controls if the detection fails - defaults to 130px */:root {  --window-controls-width: 130px;}/* Room Title Padding & draggable area */#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv44.prxiv41s > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41s > div > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41s > div > header{  padding-right: var(--window-controls-width);  app-region: drag;}/* Title buttons exclude */#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv44.prxiv41s > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41s > div > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41s > div > header > div > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41t{  app-region: no-drag;}/* Threads Padding & draggable area */#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv44.prxiv41s > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41s > div > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41s > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv46.prxiv41t.ThreadDrawer_ThreadDrawerOverlay__1n9cyvz7 > header > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41a.prxiv41k.prxiv41t{  padding-right: 20px;  app-region: no-drag;}/* Invites draggable area */#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv44.prxiv41s > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41s > div > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv46.prxiv41s.ContainerColor_ContainerColor__15396tl0._1mqalmd1._1mqalmd0.ContainerColor_ContainerColor_variant_Surface__15396tl2 > header{  app-region: drag;}/* Room draggable area */#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv44.prxiv41s > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41s > div > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41t > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.style__1co06gj0.style_PageNav_size_100\%__1co06gj3.style_PageNavBox__1co06gj4 > div > header{  app-region: drag;}/* Room context button exclude */#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv44.prxiv41s > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41s > div > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41t > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.style__1co06gj0.style_PageNav_size_100\%__1co06gj3.style_PageNavBox__1co06gj4 > div > header > div > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41t > button{  app-region: no-drag;}/* Space room draggable area */ #root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv44.prxiv41s > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41s > div > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41t > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.style__1co06gj0.style_PageNav_size_100\%__1co06gj3.style_PageNavBox__1co06gj4 > div > div:nth-child(1) > div > header{  app-region: drag;} /*Space room context button exclude */#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv44.prxiv41s > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41s > div > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41t > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.style__1co06gj0.style_PageNav_size_100\%__1co06gj3.style_PageNavBox__1co06gj4 > div > div:nth-child(1) > div > header > div > div.prxiv40._1mqalmd1._1mqalmd0.prxiv41.prxiv41t > button{  app-region: no-drag;} /* Settings pop-up exlude */#portalContainer > div > div._1oc5jl83._1mqalmd1._1mqalmd0 > div{  app-region: no-drag;}")
  

  // We should handle the renderer loading and resend the quickcss
  ipcMain.on(IpcEvents.RENDERER_LOADED, () => watchCallback(null))
  watch(quickCssPath, watchCallback)
  watchCallback(null)
}

function watchCallback(e: WatchEventType | null): void {
  log.info('quickcss access: ', e)
  mainWindow?.webContents.send(IpcEvents.QUICKCSS_CHANGED, readFileSync(quickCssPath).toString())
}
