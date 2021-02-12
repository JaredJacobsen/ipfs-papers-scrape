import { pick } from "lodash/fp";

export default function transformUnpaywallMetadata(metadata) {
  const metadataKeys = [
    "doi",
    "title",
    "genre",
    "published_date",
    "journal_name",
    "journal_issns",
    "journal_issn_l",
    "journal_is_oa",
    "journal_is_in_doaj",
    "publisher",
    "is_oa",
    "oa_status",
  ];
  const someMetadata = pick(metadataKeys, metadata);

  const authors = pick(
    ["given", "family", "affiliation", "orcid"],
    metadata.z_authors
  );

  const { url_for_landing_page = null, url_for_pdf = null } =
    metadata.best_oa_location || {};

  const allMetadata = {
    ...someMetadata,
    authors,
    url_for_landing_page,
    url_for_pdf,
  };

  return allMetadata;
}
