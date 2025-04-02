{
  description = "Simple NodeJS development environment.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      forAllSystems = nixpkgs.lib.genAttrs [ "x86_64-linux" "aarch64-darwin" ];
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
          {
            default = pkgs.mkShell ({
              buildInputs = with pkgs; [ nodejs_22 yarn ];
            });
          }
      );
    };
}
