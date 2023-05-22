import React from 'react'
import { BLOCKS } from "@contentful/rich-text-types";

function RenderOptions(links) {
  // create an asset map
  const assetMap = new Map();

  // loop through the linked assets and add them to a map
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }

  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        // find the asset in the assetMap by IDs
        const asset = assetMap.get(node.data.target.sys.id);

        console.log(asset.contentType)

        switch (asset.contentType) {
          case "video/mp4":
            return (
              <video width="100%" height="100%" controls>
                <source src={asset.url} type="video/mp4" />
              </video>
            );
          case "image/png":
            return (
              <img
                src={asset.url}
                height={asset.height}
                width={asset.width}
                alt={asset.description}
              />
            );
          case "image/webp":
            return (
              <img
                src={asset.url}
                height={asset.height}
                width={asset.width}
                alt={asset.description}
              />
            );
          default:
            return "Nothing to see here...";
        }
      },
    },
  };
}

export default RenderOptions;
