import React, { useRef, useState } from "react";

const CreateListing = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handleChange = () => {};
  const handleSubmit = () => {};
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">
        Create Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4  "
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
          />
          <input
            type="tezt"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
          />
          <div className="flex gap-6 flex-wrap">
            <div>
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div>
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div>
              <input type="checkbox" id="parkingSpot" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div>
              <input type="checkbox" id="furnshid" className="w-5" />{" "}
              <span>Furnished</span>
            </div>
            <div>
              <input type="checkbox" id="offer" className="w-5" />{" "}
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 ">
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <span>Beds</span>
            </div>
            <div>
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
              />
              <span>Baths</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="p-3 border border-gray-300 rounded-lg"
              type="number"
              id="regularPrice"
              min="1"
              max="10"
            />
            <div className="flex flex-col items-center">
              <p> Regular price </p>
              <span className="text-sm ">($/Month)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="p-3 border border-gray-300 rounded-lg"
              type="number"
              id="discountPrice"
              min="1"
              max="10"
            />
            <div className="flex flex-col items-center">
              <p>Discounted price </p>

              <span className="text-sm ">($/Month)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <p className="font-semibold">
            Images :
            <span className="font-normal text-gray-700 ml-2">
              The first image will be the cover(max 6)
            </span>
          </p>
          <div className="flex flex-col gap-6 my-3">
            <div className="flex gap-4">
              <input
                className="p-3 border border-gray-300 rounded "
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="images"
                ref={fileRef}
                accept="image/*"
                multiple
              />

              <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                Upload
              </button>

              {/* <img
              onClick={() => fileRef.current.click()}
              className="rounded-full h-24 w-24 object-cover cursor-pointer mt-2 self-center"
              src=""
            /> */}
            </div>
            <div>
              <button
                disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full"
              >
                {loading ? "Loading" : "creating Listing"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
