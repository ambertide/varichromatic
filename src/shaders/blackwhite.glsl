uniform sampler2D originalTexture;
uniform vec2 textureResolution;
uniform vec3 colorChannelBalances;

/**
* Get the sum of the values of a vector's components.
*/
float sumVector(vec3 vec) {
    return vec.x + vec.y + vec.z;
}

void main() {
    vec4 originalCol = texture(originalTexture, gl_FragCoord.xy/textureResolution);
    // Get the weighted colours.
    vec3 balancedCol = originalCol.xyz * colorChannelBalances;
    // Calculate the weighted avarage.
    float bwValue = sumVector(balancedCol) / sumVector(colorChannelBalances);
    // Give it a black and white effect.
    gl_FragColor = vec4(bwValue, bwValue, bwValue, 1.0);
}