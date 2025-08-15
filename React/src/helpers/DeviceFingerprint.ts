const getCanvasFingerprint = () => {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl")
    const debugInfo = gl?.getExtension("WEBGL_debug_renderer_info")
    const info = {
        renderer: gl?.getParameter(debugInfo!.UNMASKED_RENDERER_WEBGL),
        vendor: gl?.getParameter(debugInfo!.UNMASKED_VENDOR_WEBGL)

    }
    canvas.remove()
    return info
}
const getFingerprint = () => {
    const screenInfo = {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio
    }

    const browser = {
        userAgent: navigator.userAgent,
        language: navigator.language,

    }
    return {
        screen: screenInfo,
        browser,
        canvas: getCanvasFingerprint()
    }
}

export default getFingerprint()